import { createContext, useState } from "react";

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [formation, setFormation] = useState("4-3-3");
  const [players, setPlayers] = useState(Array(11).fill(null));

  return (
    <TeamContext.Provider value={{ formation, setFormation, players, setPlayers }}>
      {children}
    </TeamContext.Provider>
  );
};
