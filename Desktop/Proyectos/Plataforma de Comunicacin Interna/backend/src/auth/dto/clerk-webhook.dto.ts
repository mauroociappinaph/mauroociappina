export class ClerkWebhookDto {
  data: {
    id: string;
    object: string;
    type: string;
    data: {
      id: string;
      email_addresses: Array<{
        id: string;
        email_address: string;
        verification: {
          status: string;
        };
      }>;
      first_name: string;
      last_name: string;
      image_url: string;
      created_at: number;
      updated_at: number;
    };
  };
  object: string;
  type: string;
}
