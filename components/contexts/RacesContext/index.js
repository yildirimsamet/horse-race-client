import { createContext, useContext } from "react";
const RacesContext = createContext();
export const RacesProvider = RacesContext.Provider;
export const useRaces = () => useContext(RacesContext);