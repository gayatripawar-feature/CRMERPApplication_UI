import React, { createContext, useContext } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({ value, children }) => (
  <SessionContext.Provider value={value}>
    {children}
  </SessionContext.Provider>
);

export const useSession = () => useContext(SessionContext);
