import { useSeatContext } from "../context/SeatContext"; 

const BookingSummary = () => {
  const { selectedSeats } = useSeatContext(); 
  const totalCost = selectedSeats.reduce((acc, seat) => acc + seat.seatPrice, 0);

  return (
    <div className="bg-gray-100 mt-4 rounded-lg">
      <h3 className="p-0 sm:p-4 font-bold text-xl">Booking Summary</h3>
      <ul>
        {selectedSeats.map((seat, index) => (
          <li key={index} className="flex justify-between py-1 p-0 sm:p-4">
            <span>{seat.seatId}</span>
            <span>₹{seat.seatPrice}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between font-bold mt-2 p-0 sm:p-4">
        <span>Total Cost:</span>
        <span>₹{totalCost}</span>
      </div>
    </div>
  );
};

export default BookingSummary;

  