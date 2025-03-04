import type { SuccessResponse } from '@/common/types';
import type { ChangePasswordSchema } from '@/common/types/api/auth';
import type { Avatar, ImagePosition } from '@/common/types/api/media';
import type { User } from '@/common/types/api/user';
import type { UpdateProfileSchema } from '@/common/types/api/user/update-profile.type';
import { HttpClient, mediaHttpClient } from '@/lib/http';

class UserHttpClient extends HttpClient {
  public getUserProfile() {
    return this.get<SuccessResponse<User>>('/me/profile', {
      isPrivateRoute: true,
    });
  }

  public updateProfile(data: UpdateProfileSchema) {
    return this.patch<SuccessResponse<User>>('/me/profile', data, {
      isPrivateRoute: true,
    });
  }

  public changePassword(data: Omit<ChangePasswordSchema, 'confirmPassword'>) {
    return this.patch('/me/password', data, {
      isPrivateRoute: true,
    });
  }

  public async setAvatar(
    file: File,
    position: ImagePosition,
    scale: number,
    baseDimension: number,
  ) {
    const {
      data: { name: id },
    } = await mediaHttpClient.upload(file, 'avatars');
    const { offsetX, offsetY } = position;

    return this.patch<SuccessResponse<Avatar>>(
      '/me/avatar',
      {
        id: id.replaceAll('avatars/', ''),
        offsetX,
        offsetY,
        zoom: scale,
        baseDimension,
      },
      {
        isPrivateRoute: true,
      },
    );
  }
}

const userHttpClient = new UserHttpClient();
export { UserHttpClient, userHttpClient };
