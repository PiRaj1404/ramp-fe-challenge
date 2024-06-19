import { useCallback, useState } from "react";
import { PaginatedResponse, Transaction } from "../utils/types";
import { PaginatedTransactionsResult } from "./types";
import { useCustomFetch } from "./useCustomFetch";

export function usePaginatedTransactions(): PaginatedTransactionsResult {
  const { fetchWithCache, loading } = useCustomFetch();
  const [paginatedTransactions, setPaginatedTransactions] = useState<PaginatedResponse<Transaction[]> | null>(null);
  const [hasMorePages, setHasMorePages] = useState(true);

  const fetchAll = useCallback(async () => {
    if (paginatedTransactions && !hasMorePages) return; // Do not fetch if no more pages

    const nextPage = paginatedTransactions?.nextPage || 0;
    const response = await fetchWithCache<PaginatedResponse<Transaction[]>, { page: number }>(
      "paginatedTransactions", { page: nextPage }
    );

    if (response && response.data.length > 0) {
      setPaginatedTransactions(prev => ({
        data: prev ? [...prev.data, ...response.data] : response.data,
        nextPage: response.nextPage
      }));
      setHasMorePages(response.nextPage !== null);
    } else {
      setHasMorePages(false);
    }
  }, [fetchWithCache, paginatedTransactions, hasMorePages]);

  const invalidateData = useCallback(() => {
    setPaginatedTransactions(null);
    setHasMorePages(true);
  }, []);

  return { data: paginatedTransactions, loading, fetchAll, invalidateData, hasMorePages };
}
