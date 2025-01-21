import { useState } from "react";
import { useSeatContext } from "../context/SeatContext";
import Modal from "../components/Modal"; 

const seatData = [
  { row: "A", seats: 10, price: 100 }, // Front rows: ₹100 (Silver)
  { row: "B", seats: 10, price: 100 },
  { row: "C", seats: 10, price: 150 }, // Middle rows: ₹150 (Gold)
  { row: "D", seats: 10, price: 150 },
  { row: "E", seats: 10, price: 200 }, // Back rows: ₹200 (Platinum)
  { row: "F", seats: 10, price: 200 }
];

const SeatLayout = () => {
  const { selectedSeats, setSelectedSeats } = useSeatContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const toggleSeat = (seatId, seatPrice) => {
    if (selectedSeats.length >= 8 && !selectedSeats.some(seat => seat.seatId === seatId)) {
      setModalMessage("You can only select up to 8 seats.");
      setIsModalOpen(true);
      return;
    }

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.some(seat => seat.seatId === seatId)) {
        return prevSelectedSeats.filter((seat) => seat.seatId !== seatId);
      } else {
        return [...prevSelectedSeats, { seatId, seatPrice }];
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Screen Display */}
      <div className="w-full text-center py-2 bg-gray-800 text-white mb-4">
        <strong>SCREEN</strong>
      </div>

      {/* Pricing Categories: Silver, Gold, Platinum */}
      <div className="w-full text-center py-2 mb-4">
        <div className="flex flex-wrap justify-evenly text-sm sm:text-base">
          <div className="text-silver">
            <div>Silver (A1-B10)</div>
            <div>₹100</div>
          </div>
          <div className="text-gold">
            <div>Gold (C1-D10)</div>
            <div>₹150</div>
          </div>
          <div className="text-platinum">
            <div>Platinum (E1-F10)</div>
            <div>₹200</div>
          </div>
        </div>
      </div>

      {/* Seat Layout Grid */}
      <div className="grid grid-rows-6 gap-2 sm:gap-4 px-2 sm:px-6">
        {seatData.map((rowData, rowIndex) => (
          <div key={rowIndex} className="flex justify-center flex-nowrap gap-1">
            {Array.from({ length: rowData.seats }).map((_, seatIndex) => {
              const seatId = `${rowData.row}${seatIndex + 1}`;
              const isSelected = selectedSeats.some(
                (seat) => seat.seatId === seatId
              );

              let seatClass = "";
              if (rowData.price === 100) {
                seatClass = "bg-silver";
              } else if (rowData.price === 150) {
                seatClass = "bg-gold";
              } else if (rowData.price === 200) {
                seatClass = "bg-platinum";
              }

              return (
                <button
                  key={seatId}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${seatClass} ${
                    isSelected ? "border-4 border-black" : "border"
                  }`}
                  onClick={() => toggleSeat(seatId, rowData.price)}
                >
                  {seatId}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Show Modal if open */}
      {isModalOpen && <Modal message={modalMessage} onClose={handleCloseModal} />}
    </div>
  );
};

export default SeatLayout;
