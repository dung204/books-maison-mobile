import Config from 'react-native-config';
import { z } from 'zod';

const envSchema = z.object({
  API_ENDPOINT: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  CLOUDINARY_ENV_NAME: z.string(),
});

export const envVariables = envSchema.parse(Config);
