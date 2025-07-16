
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  CORS_ORIGIN: z.string().url(),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_SERVER: z.string().min(1),
  DB_DATABASE: z.string().min(1),
  DB_ENCRYPT: z.string().transform(val => val === 'true').default('true'),
  JWT_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
