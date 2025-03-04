import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    password: z.string().nonempty('Password is required'),
    newPassword: z
      .string()
      .min(6, 'New password must contain at least 6 characters'),
    confirmPassword: z
      .string()
      .nonempty('Confirm password is required')
      .max(100, 'Password must not exceed 100 characters'),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: 'Confirm password must match with new password',
      path: ['confirmPassword'],
    },
  )
  .refine(({ password, newPassword }) => password !== newPassword, {
    message: 'New password must be different from the old password',
    path: ['newPassword'],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
