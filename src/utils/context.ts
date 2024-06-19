import { createContext } from "react";

type AppContextProps = {
  setError: (error: string) => void;
  cache?: React.MutableRefObject<Map<string, string>>;
  transactionApprovals: { [key: string]: boolean }; // This holds the approval state of each transaction.
  setTransactionApproval: (transactionId: string, approved: boolean) => void; // This function updates the approval state.
};

export const AppContext = createContext<AppContextProps>({
  setError: () => {},
  transactionApprovals: {}, // Initialize as empty object
  setTransactionApproval: () => {} // Initialize as no-op function
});
