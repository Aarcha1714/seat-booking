import { useState } from "react";
import SeatLayout from "../components/SeatLayout";
import BookingSummary from "../components/BookingSummary";
import { SeatProvider, useSeatContext } from "../context/SeatContext";
import Modal from "../components/Modal"; 

const Home = () => {
  return (
    <SeatProvider>
      <div className="min-h-screen flex flex-col p-4 sm:p-10">
        <h1 className="text-3xl font-bold mb-4">Seat Booking</h1>
        <SeatLayout />
        <BookingSummary />
        <BookingButton />
      </div>
    </SeatProvider>
  );
};

const BookingButton = () => {
  const { selectedSeats } = useSeatContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleBookNow = () => {
    if (selectedSeats.length > 0) {
      setModalMessage("Booking Successful!");
      setIsModalOpen(true);
    } else {
      setModalMessage("Please select seats to book.");
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-4 p-0 sm:p-4">
      {selectedSeats.length > 8 && (
        <p className="text-red-500">You can only select up to 8 seats.</p>
      )}
      <button
        onClick={handleBookNow}
        className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-md"
      >
        Book Now
      </button>

      {isModalOpen && (
        <Modal message={modalMessage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Home;
