import type { CommonSearchParams } from '@/common/types';
import type { SuccessResponse } from '@/common/types';
import type { Fine } from '@/common/types/api/fine';
import {
  type Transaction,
  TransactionMethod,
} from '@/common/types/api/transaction';
import { HttpClient } from '@/lib/http';

class FineHttpClient extends HttpClient {
  public getAllFinesOfCurrentUser(params?: CommonSearchParams) {
    return this.get<SuccessResponse<Fine[]>>('/me/fines', {
      params,
    });
  }

  public payFine(id: string, method: TransactionMethod, redirectUrl: string) {
    return this.post<SuccessResponse<Transaction>>(
      `/fines/pay/${id}`,
      {
        method,
        redirectUrl,
      },
      {
        isPrivateRoute: true,
      },
    );
  }

  public getFineById(id: string) {
    return this.get<SuccessResponse<Fine>>(`/fines/${id}`, {
      isPrivateRoute: true,
    });
  }
}

const fineHttpClient = new FineHttpClient();
export { fineHttpClient, FineHttpClient };
