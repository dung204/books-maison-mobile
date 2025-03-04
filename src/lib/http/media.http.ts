import type { SuccessResponse } from '@/common/types';
import type { Media } from '@/common/types/api/media';
import { HttpClient } from '@/lib/http/core.http';

class MediaHttpClient extends HttpClient {
  public upload(file: File, folder?: string) {
    const formData = new FormData();
    formData.set('file', file);

    return this.post<SuccessResponse<Media>>('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        folder,
      },
      isPrivateRoute: true,
    });
  }
}

const mediaHttpClient = new MediaHttpClient();
export { mediaHttpClient, MediaHttpClient };
