import { createContext, useContext, useState } from "react";

const SslCheckerContext = createContext({});

const SslCheckerContextProvider = ({ children }) => {
  const [sslData, setSslData] = useState(null);

  const values = {
    sslData,
    setSslData,
  };

  return (
    <SslCheckerContext.Provider value={values}>
      {children}
    </SslCheckerContext.Provider>
  );
};

export const useSslChecker = () => {
  const context = useContext(SslCheckerContext);

  if (context === undefined) {
    throw new Error(
      "useSslChecker must be used within an SslCheckerContextProvider"
    );
  }

  return context;
};

export default SslCheckerContextProvider;
