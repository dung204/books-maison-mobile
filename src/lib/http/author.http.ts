import type { SuccessResponse } from '@/common/types';
import type { Author, AuthorSearchParams } from '@/common/types/api/author';
import { HttpClient } from '@/lib/http';

class AuthorHttpClient extends HttpClient {
  public getAllAuthors(params?: AuthorSearchParams) {
    return this.get<SuccessResponse<Author[]>>('/authors', {
      params,
    });
  }

  public getAuthorById(id: string) {
    return this.get<SuccessResponse<Author>>(`/authors/${id}`);
  }
}

const authorHttpClient = new AuthorHttpClient();
export { authorHttpClient, AuthorHttpClient };
