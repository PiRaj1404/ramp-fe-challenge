import { useCallback, useState } from "react"
import { Employee } from "../utils/types"
import { useCustomFetch } from "./useCustomFetch"
import { EmployeeResult } from "./types"

export function useEmployees(): EmployeeResult {
  const { fetchWithCache, loading } = useCustomFetch();
  const [employees, setEmployees] = useState<Employee[] | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      const employeesData = await fetchWithCache<Employee[]>("employees");
      setEmployees(employeesData);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  }, [fetchWithCache]);

  const invalidateData = useCallback(() => {
    setEmployees(null);
  }, []);

  return { data: employees, loading, fetchAll, invalidateData };
}
