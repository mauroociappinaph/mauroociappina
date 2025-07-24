import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHmac, timingSafeEqual } from 'crypto';

import { UsersService } from '../users/users.service';
import { ClerkWebhookDto } from './dto/clerk-webhook.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {}

  async verifyWebhookSignature(
    svixId: string,
    svixTimestamp: string,
    svixSignature: string,
    payload: any
  ): Promise<boolean> {
    try {
      const webhookSecret = this.configService.get<string>(
        'CLERK_WEBHOOK_SECRET'
      );

      if (!webhookSecret) {
        this.logger.error('Clerk webhook secret is not configured');
        return false;
      }

      // Convert payload to string if it's not already
      const payloadString =
        typeof payload === 'string' ? payload : JSON.stringify(payload);

      // Create the signature payload
      const signaturePayload = `${svixId}.${svixTimestamp}.${payloadString}`;

      // Create the expected signature
      const hmac = createHmac('sha256', webhookSecret);
      hmac.update(signaturePayload);
      const expectedSignature = hmac.digest('hex');

      // Compare signatures using timing-safe comparison
      const signatureBuffer = Buffer.from(svixSignature);
      const expectedBuffer = Buffer.from(expectedSignature);

      return (
        signatureBuffer.length === expectedBuffer.length &&
        timingSafeEqual(signatureBuffer, expectedBuffer)
      );
    } catch (error) {
      this.logger.error(`Error verifying webhook signature: ${error.message}`);
      return false;
    }
  }

  async processWebhook(webhookData: ClerkWebhookDto): Promise<any> {
    try {
      const { type } = webhookData;
      const userData = webhookData.data.data;

      switch (type) {
        case 'user.created':
          return this.handleUserCreated(userData);

        case 'user.updated':
          return this.handleUserUpdated(userData);

        case 'user.deleted':
          return this.handleUserDeleted(userData.id);

        default:
          this.logger.log(`Unhandled webhook event type: ${type}`);
          return {
            status: 'ignored',
            message: `Event type ${type} not handled`,
          };
      }
    } catch (error) {
      this.logger.error(`Error processing webhook: ${error.message}`);
      throw error;
    }
  }

  private async handleUserCreated(userData: any): Promise<any> {
    try {
      const primaryEmail =
        userData.email_addresses.find(
          email => email.verification.status === 'verified'
        )?.email_address || userData.email_addresses[0]?.email_address;

      if (!primaryEmail) {
        throw new Error('No valid email address found for user');
      }

      const user = await this.usersService.createUser({
        id: userData.id,
        email: primaryEmail,
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        imageUrl: userData.image_url,
      });

      return { status: 'success', message: 'User created', userId: user.id };
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }

  private async handleUserUpdated(userData: any): Promise<any> {
    try {
      const primaryEmail =
        userData.email_addresses.find(
          email => email.verification.status === 'verified'
        )?.email_address || userData.email_addresses[0]?.email_address;

      if (!primaryEmail) {
        throw new Error('No valid email address found for user');
      }

      const user = await this.usersService.updateUser(userData.id, {
        email: primaryEmail,
        firstName: userData.first_name,
        lastName: userData.last_name,
        imageUrl: userData.image_url,
      });

      return { status: 'success', message: 'User updated', userId: user.id };
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`);
      throw error;
    }
  }

  private async handleUserDeleted(userId: string): Promise<any> {
    try {
      await this.usersService.deleteUser(userId);
      return { status: 'success', message: 'User deleted', userId };
    } catch (error) {
      this.logger.error(`Error deleting user: ${error.message}`);
      throw error;
    }
  }
}
