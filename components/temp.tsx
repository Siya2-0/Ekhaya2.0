interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  phone: string;
  confirmation_sent_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    LOA: string;
    email: string;
    email_verified: boolean;
    first_name: string;
    image_url: string;
    last_name: string;
    phone_number: string;
    phone_verified: boolean;
    role: string;
    status: string;
    sub: string;
  };
  identities: null | Record<string, unknown>; // Replace with a more specific type if you know the structure
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}