import React, { useState, useEffect } from "react";
import SeatComponent from "./SeatComponent";
import { Seat } from "../models/Seat";
import "./SeatSelection.css";

export interface UISeat extends Seat {
  isSelected: boolean;
}

const SeatSelection: React.FC = () => {
  const [seats, setSeats] = useState<UISeat[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/seats")
      .then((response) => response.json())
      .then((data) => {
        const uiSeats = data.map((seatData) => ({
          ...seatData,
          isSelected: false,
        }));
        setSeats(uiSeats);
      })
      .catch((error) => {
        console.error("Error fetching seats:", error);
      });
  }, []);

  const handleSeatClick = (seatId: string) => {
    setSeats((prevSeats) =>
  prevSeats.map((seat) =>
    seat.id === seatId
      ? { ...seat, isSelected: !seat.isSelected } // Toggle isSelected state
      : seat
  )
    );
  };

  const rows = seats.reduce((acc, seat) => {
    if (!acc[seat.seatRow]) {
      acc[seat.seatRow] = [];
    }
    acc[seat.seatRow].push(seat);
    return acc;
  }, {});

  const seatLegend = (
    <div className="seat-legend">
      <div className="legend-item">
        <span className="legend-indicator available"></span>Available
      </div>
      <div className="legend-item">
        <span className="legend-indicator reserved"></span>Reserved
      </div>
      <div className="legend-item">
        <span className="legend-indicator selected"></span>Selected
      </div>
      <div className="legend-item">
        <span className="legend-indicator handicap"></span>Wheelchair
      </div>
    </div>
  );

  // Inside SeatSelection.tsx render method

  return (
    <div className="cinema-layout">
      <div className="cinema-screen-container">
        <svg viewBox="0 0 150 15" className="cinema-screen">
          <path
            d="M 0 9 Q 73 -3 143 9 Q 142 12 141 14 Q 73 4 2 14 Z"
            style={{ fill: "#dcdcdc" }}
          />
          Sorry, your browser does not support inline SVG.
        </svg>

        <div className="screen-label">S C R E E N</div>
      </div>
      {Object.keys(rows).map((rowLabel) => (
        <div key={rowLabel} className="row">
          <div className="row-label">{rowLabel}</div>
          {rows[rowLabel].map((seat, index) => (
            <SeatComponent
              key={`${rowLabel}-${seat.id || index}`}
              seat={seat}
              onSeatClick={handleSeatClick}
              className={
                seat.isSelected
                  ? "selected"
                  : !seat.available || seat.Status !== 1
                  ? "reserved"
                  : ""
              }
            />
          ))}
          <div className="row-label">{rowLabel}</div>
        </div>
      ))}
      {seatLegend}
    </div>
  );
};

export default SeatSelection;
