import {
  Body,
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClerkWebhookDto } from './dto/clerk-webhook.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('webhook')
  async handleClerkWebhook(
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
    @Body() webhookData: ClerkWebhookDto
  ) {
    // Verify webhook signature
    const isValid = await this.authService.verifyWebhookSignature(
      svixId,
      svixTimestamp,
      svixSignature,
      webhookData
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid webhook signature');
    }

    // Process webhook data
    return this.authService.processWebhook(webhookData);
  }
}
