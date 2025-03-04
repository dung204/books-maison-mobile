import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .nonempty('Email is required')
    .email('Email is invalid'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must have minimum of 6 characters'),
  firstName: z
    .string({ required_error: 'First name is required' })
    .nonempty('First name is required')
    .max(128, 'First name must not exceed 128 characters'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .nonempty('Last name is required')
    .max(128, 'Last name must not exceed 128 characters.'),
  address: z.string().max(256).optional(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
