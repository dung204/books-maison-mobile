import type { CommonSearchParams, SuccessResponse } from '@/common/types';
import type { Transaction } from '@/common/types/api/transaction';
import { HttpClient } from '@/lib/http';

class TransactionHttpClient extends HttpClient {
  public getTransactionsOfCurrentUser(params?: CommonSearchParams) {
    return this.get<SuccessResponse<Transaction[]>>('/me/transactions', {
      params,
      isPrivateRoute: true,
    });
  }

  public getTransactionById(id: string) {
    return this.get<SuccessResponse<Transaction>>(`/transactions/${id}`, {
      isPrivateRoute: true,
    });
  }
}

const transactionHttpClient = new TransactionHttpClient();
export { transactionHttpClient, TransactionHttpClient };
