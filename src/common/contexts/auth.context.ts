import { createContext } from 'react';

import type { User } from '@/common/types/api/user';

interface AuthContextValue {
  user: User | null;
  logout: () => Promise<void>;
  authenticate: (refetchUser?: boolean) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
