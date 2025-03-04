import type { SuccessResponse } from '@/common/types';
import type {
  Checkout,
  CheckoutSearchParams,
} from '@/common/types/api/checkout';
import { HttpClient } from '@/lib/http';

class CheckoutHttpClient extends HttpClient {
  public getCheckoutsOfCurrentUser(params?: CheckoutSearchParams) {
    return this.get<SuccessResponse<Checkout[]>>('/me/checkouts', {
      params,
      isPrivateRoute: true,
    });
  }

  public createCheckout(bookId: string) {
    return this.post(
      '/me/checkouts',
      { bookId },
      {
        isPrivateRoute: true,
      },
    );
  }

  public getCheckoutById(id: string) {
    return this.get<SuccessResponse<Checkout>>(`/checkouts/${id}`, {
      isPrivateRoute: true,
    });
  }
}

const checkoutHttpClient = new CheckoutHttpClient();
export { checkoutHttpClient, CheckoutHttpClient };
