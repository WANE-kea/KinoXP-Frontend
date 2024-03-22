import React from "react";
import { Seat } from "../models/Seat";

interface Props {
  seat: Seat;
  onSeatClick: (seatId: string) => void;
  className?: string;
}

const SeatComponent: React.FC<Props> = ({ seat, onSeatClick }) => {
  const handleClick = () => {
    // Allow clicking only if the seat is not reserved and available
    if (!seat.isReserved && seat.available) {
      onSeatClick(seat.id);
    }
  };

  // Determine the seat class based on its state and type
  const seatClasses = [
    "seat",
    seat.isReserved ? "reserved" : "",
    seat.isSelected ? "selected" : "",
    seat.type === "HANDICAP" ? "handicap" : "",
    seat.type === "VIP" ? "vip" : "",
  ].filter(Boolean).join(" ");

  return (
    <button
      disabled={seat.isReserved || !seat.available}
      className={seatClasses}
      onClick={handleClick}
      data-seat-number={seat.seatNr}
    >
      {seat.type === "HANDICAP" || seat.type === "VIP" ? (
        <img
          src={`/${seat.type}.svg`}
          alt={`${seat.type} seat`}
        />
      ) : (
        <span>{seat.seatNr}</span>
      )}
    </button>
  );
};

export default SeatComponent;
