import React, { createContext, useContext } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { currentUser } = useCurrentUser();

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
