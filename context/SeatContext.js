import { createContext, useContext, useState } from "react";

const SeatContext = createContext();

export const useSeatContext = () => {
  return useContext(SeatContext);
};

export const SeatProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <SeatContext.Provider value={{ selectedSeats, setSelectedSeats }}>
      {children}
    </SeatContext.Provider>
  );
};
