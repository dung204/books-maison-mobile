import type { SuccessResponse } from '@/common/types';
import type { Book, BookSearchParams } from '@/common/types/api/book';
import { HttpClient } from '@/lib/http';

class FavouriteBookHttpClient extends HttpClient {
  getAllFavouriteBooksOfCurrentUser(params: BookSearchParams) {
    return this.get<SuccessResponse<Book[]>>('/me/books/favourite', {
      params,
      isPrivateRoute: true,
    });
  }

  public addBookToFavourite(bookId: string) {
    return this.post<void>(`/me/books/favourite/${bookId}`, undefined, {
      isPrivateRoute: true,
    });
  }

  public removeBookFromFavourite(bookId: string) {
    return this.delete<void>(`/me/books/favourite/${bookId}`, {
      isPrivateRoute: true,
    });
  }

  public checkHasFavoured(bookId: string) {
    return this.get<SuccessResponse<boolean>>(
      `/favourite-books/check/${bookId}`,
      {
        isPrivateRoute: true,
      },
    );
  }
}

const favouriteBookHttpClient = new FavouriteBookHttpClient();
export { favouriteBookHttpClient, FavouriteBookHttpClient };
