import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().nonempty('Email is required').email('Email is invalid'),
  password: z.string().nonempty('Password is required'),
  firstName: z
    .string()
    .nonempty('First name is required')
    .max(128, 'First name must not exceed 128 characters'),
  lastName: z
    .string()
    .nonempty('Last name is required')
    .max(128, 'Last name must not exceed 128 characters.'),
  address: z.string().max(256).optional(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
