import type {
  LoginSuccessResponse,
  RefreshSuccessResponse,
  SuccessResponse,
} from '@/common/types';
import type {
  LoginSchema,
  OAuthAction,
  RegisterSchema,
} from '@/common/types/api/auth';
import type { User } from '@/common/types/api/user';
import { HttpClient } from '@/lib/http';

class AuthHttpClient extends HttpClient {
  public login(data: LoginSchema) {
    return this.post<LoginSuccessResponse>('/auth/login', data);
  }

  public register(data: RegisterSchema) {
    return this.post<SuccessResponse<User>>('/auth/register', data);
  }

  public logout() {
    return this.delete('/auth/logout', {
      isPrivateRoute: true,
    });
  }

  public refreshToken(refreshToken: string) {
    return this.post<RefreshSuccessResponse>('/auth/refresh', {
      refreshToken,
    });
  }

  public googleAuth(code: string, action: OAuthAction) {
    return this.post<LoginSuccessResponse>('/auth/google', {
      code,
      action,
    });
  }
}

const authHttpClient = new AuthHttpClient();
export { authHttpClient, AuthHttpClient };
