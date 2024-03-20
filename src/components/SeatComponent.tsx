import React from "react";
import { Seat } from "../models/Seat";

interface Props {
  seat: Seat;
  onSeatClick: (seatId: string) => void;
  className?: string;
}

const SeatComponent: React.FC<Props> = ({ seat, onSeatClick }) => {
  const handleClick = () => {
    if (seat.available) {
      onSeatClick(seat.id);
    }
  };

  const isSeatReserved = !seat.available;
  const isHandicap = seat.type === "HANDICAP";
  const isVIP = seat.type === "VIP";
  const isSelected = seat.isSelected;

  const seatStateClass = isSeatReserved
    ? "reserved"
    : isSelected
    ? "selected"
    : "available";
  const seatTypeClass = isHandicap ? "handicap" : isVIP ? "vip" : "";

  const seatClasses = `seat ${seatTypeClass} ${seatStateClass}`.trim();

  return (
    <button
      disabled={isSeatReserved}
      className={seatClasses}
      onClick={handleClick}
      data-seat-number={seat.seatNr}
    >
      {isHandicap || isVIP ? (
        <img
          src={isHandicap ? "/public/handicap.svg" : "/public/vip.svg"}
          alt={isHandicap ? "Handicap seat" : "VIP seat"}
        />
      ) : (
        <span>{seat.seatNr}</span>
      )}
    </button>
  );
};


export default SeatComponent;
