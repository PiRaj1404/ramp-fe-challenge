import { useRef, useState, useMemo, useCallback, useEffect } from "react"
import { AppContext } from "../../utils/context"
import mockData from "../../mock-data.json"
import { AppContextProviderComponent } from "./types"

export const AppContextProvider: AppContextProviderComponent = ({ children }) => {
  const cache = useRef(new Map<string, string>())
  const [error, setError] = useState<string>("")
  const [transactionApprovals, setTransactionApprovals] = useState<{ [id: string]: boolean }>({})

  const setTransactionApproval = useCallback((transactionId: string, approved: boolean) => {
    setTransactionApprovals((prev) => {
      const updatedApprovals = { ...prev, [transactionId]: approved }
      localStorage.setItem("transactionApprovals", JSON.stringify(updatedApprovals))
      return updatedApprovals
    })
  }, [])

  useEffect(() => {
    const initialApprovals: { [id: string]: boolean } = {}
    mockData.transactions.forEach((transaction) => {
      initialApprovals[transaction.id] = transaction.approved
    })
    setTransactionApprovals(initialApprovals)
  }, [])

  const contextValue = useMemo(
    () => ({
      setError,
      cache,
      transactionApprovals,
      setTransactionApproval,
    }),
    [setError, cache, transactionApprovals, setTransactionApproval]
  )

  return (
    <AppContext.Provider value={contextValue}>
      {error ? (
        <div className="RampError">
          <h1 className="RampTextHeading--l">Oops. Application broken</h1>
          <div className="RampBreak--l" />
          Error: {error}
        </div>
      ) : (
        children
      )}
    </AppContext.Provider>
  )
}
