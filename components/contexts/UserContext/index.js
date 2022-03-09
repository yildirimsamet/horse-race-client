import { createContext, useContext } from "react";
const UserContext = createContext();
export const UserProvider = UserContext.Provider;
export const useUser = () => useContext(UserContext);