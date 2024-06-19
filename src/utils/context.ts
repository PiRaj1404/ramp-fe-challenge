import { createContext } from "react";

type AppContextProps = {
  setError: (error: string) => void;
  cache?: React.MutableRefObject<Map<string, string>>;
  transactionApprovals: { [key: string]: boolean }; 
  setTransactionApproval: (transactionId: string, approved: boolean) => void; 
};

export const AppContext = createContext<AppContextProps>({
  setError: () => {},
  transactionApprovals: {}, 
  setTransactionApproval: () => {} 
});
