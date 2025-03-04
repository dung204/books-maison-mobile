import type { SuccessResponse } from '@/common/types';
import type { Book, BookSearchParams } from '@/common/types/api/book';
import { HttpClient } from '@/lib/http';

class BookHttpClient extends HttpClient {
  public getAllBooks(params?: BookSearchParams) {
    return this.get<SuccessResponse<Book[]>>('/books', {
      params,
      // TODO: optional auth
    });
  }

  public getBookById(id: string) {
    return this.get<SuccessResponse<Book>>(`/books/${id}`, {});
  }
}

const bookHttpClient = new BookHttpClient();
export { BookHttpClient, bookHttpClient };
