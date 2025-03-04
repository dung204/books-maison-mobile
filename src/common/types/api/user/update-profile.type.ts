import { z } from 'zod';

import { registerSchema } from '@/common/types/api/auth';

export const updateProfileSchema = registerSchema.omit({
  password: true,
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
