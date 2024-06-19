import { useRef, useState, useMemo, useCallback } from "react";
import { AppContext } from "../../utils/context";
import { AppContextProviderComponent } from "./types";

export const AppContextProvider: AppContextProviderComponent = ({ children }) => {
    const cache = useRef(new Map<string, string>());
    const [error, setError] = useState<string>("");
    const [transactionApprovals, setTransactionApprovals] = useState<{ [id: string]: boolean }>({});

    
    const setTransactionApproval = useCallback((transactionId: string, approved: boolean) => {
        setTransactionApprovals(prev => ({ ...prev, [transactionId]: approved }));
    }, []);

    
    const contextValue = useMemo(() => ({
        setError,
        cache,
        transactionApprovals,
        setTransactionApproval
    }), [setError, cache, transactionApprovals, setTransactionApproval]);

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
    );
};
