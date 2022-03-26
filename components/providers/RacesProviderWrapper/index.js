import { useState } from "react";
import { RacesProvider } from "../../contexts/RacesContext";

const RacesProviderWrapper = ({ children }) => {
  const [cRaces, setCRaces] = useState([]);
  return (
    <RacesProvider value={{ cRaces, setCRaces }}>{children}</RacesProvider>
  );
};

export default RacesProviderWrapper;
