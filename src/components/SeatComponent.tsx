import React from 'react';
import { Seat } from '../services/interfaces';

interface Props {
  seat: Seat;
  onSeatClick: (seatId: string) => void;
   className?: string;
}

const SeatComponent: React.FC<Props> = ({ seat, onSeatClick }) => {
  const handleClick = () => {
    if (seat.available && seat.type !== 'HANDICAP') {
      onSeatClick(seat.id);
    }
  };

  const isSeatReserved = !seat.available || seat.type === 'HANDICAP';
  const isHandicap = seat.type === 'HANDICAP';
  const seatClasses = `seat ${isSeatReserved ? "reserved" : ""} ${
    seat.isSelected ? "selected" : ""
  } ${isHandicap ? "handicap" : ""}`.trim();

return (
<button
  disabled={isSeatReserved}
  className={seatClasses}
  onClick={handleClick}
  data-seat-number={seat.seatNr}
>
  {isHandicap ? (
    <img src="/public/handicap.svg" alt="Handicap seat" />
  ) : (
    <span>{seat.seatNr}</span>
  )}
</button>

  );
};

export default SeatComponent;
