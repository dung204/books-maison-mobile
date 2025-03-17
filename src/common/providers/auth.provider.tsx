import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { type PropsWithChildren, useEffect, useState } from 'react';

import { AuthContext } from '@/common/contexts';
import { asyncStorageService } from '@/common/services';
import { AsyncStorageKey } from '@/common/types';
import type { User } from '@/common/types/api/user';
import { Loading } from '@/components/layouts';
import { authHttpClient, userHttpClient } from '@/lib/http';

export function AuthProvider({ children }: PropsWithChildren) {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const queryClient = useQueryClient();

  const {
    data: res,
    isLoading: isLoadingQuery,
    refetch,
  } = useQuery({
    queryFn: () => userHttpClient.getUserProfile(),
    queryKey: ['users', 'single', 'me'],
    enabled: userId !== null,
  });

  const { mutateAsync: triggerRefreshToken } = useMutation({
    mutationFn: (refreshToken: string) =>
      authHttpClient.refreshToken(refreshToken),
  });

  const logout = async () => {
    await asyncStorageService.remove(AsyncStorageKey.ACCESS_TOKEN);
    await asyncStorageService.remove(AsyncStorageKey.REFRESH_TOKEN);
    setUserId(null);
    setUser(null);
  };

  const authenticate = async (refetchUser = false) => {
    let accessToken: string;
    let refreshToken: string;

    try {
      accessToken = await asyncStorageService.get(
        AsyncStorageKey.ACCESS_TOKEN,
        '',
      );

      const { exp, sub } = jwtDecode(accessToken);
      if (exp! * 1000 < Date.now()) {
        throw new Error();
      }

      setUserId(sub!);
      if (refetchUser) {
        await queryClient.invalidateQueries({
          queryKey: ['users', 'single', 'me'],
        });
        await refetch();
      }
    } catch (accessTokenError) {
      try {
        refreshToken = await asyncStorageService.get(
          AsyncStorageKey.REFRESH_TOKEN,
          '',
        );
        const result = (await triggerRefreshToken(refreshToken)).data;

        await asyncStorageService.set(
          AsyncStorageKey.ACCESS_TOKEN,
          result.accessToken,
        );
        await asyncStorageService.set(
          AsyncStorageKey.REFRESH_TOKEN,
          result.refreshToken,
        );

        setUserId(result.id);
        if (refetchUser) {
          await queryClient.invalidateQueries({
            queryKey: ['users', 'single', 'me'],
          });
          await refetch();
        }
      } catch (refreshTokenError) {
        setUserId(null);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userId && res && !isLoadingQuery) {
      setUser(res.data);
      setIsLoading(false);
    }
  }, [res, userId, isLoadingQuery]);

  return (
    <AuthContext.Provider value={{ user, logout, authenticate }}>
      {!isLoading ? children : <Loading />}
    </AuthContext.Provider>
  );
}
