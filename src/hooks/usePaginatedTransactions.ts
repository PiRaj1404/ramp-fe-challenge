import { useCallback, useState } from "react"
import { PaginatedRequestParams, PaginatedResponse, Transaction } from "../utils/types"
import { PaginatedTransactionsResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"

export function usePaginatedTransactions(): PaginatedTransactionsResult {
  const { fetchWithCache, loading } = useCustomFetch();
  const [paginatedTransactions, setPaginatedTransactions] = useState<PaginatedResponse<Transaction[]> | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      const response = await fetchWithCache<PaginatedResponse<Transaction[]>, PaginatedRequestParams>(
        "paginatedTransactions",
        { page: paginatedTransactions?.nextPage ?? 0 }
      );
      setPaginatedTransactions(prev => {
        if (!response) return prev;
        return prev ? {
          ...prev,
          data: [...prev.data, ...response.data],
          nextPage: response.nextPage
        } : response;
      });
    } catch (error) {
      console.error("Failed to fetch paginated transactions:", error);
      
    }
  }, [fetchWithCache, paginatedTransactions?.nextPage]);

  const invalidateData = useCallback(() => {
    setPaginatedTransactions(null);
  }, []);

  return { data: paginatedTransactions, loading, fetchAll, invalidateData };
}
