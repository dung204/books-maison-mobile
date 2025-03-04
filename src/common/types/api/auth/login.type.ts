import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .nonempty('Email is required')
    .email('Email is invalid'),
  password: z
    .string({ required_error: 'Password is required' })
    .nonempty('Password is required'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
