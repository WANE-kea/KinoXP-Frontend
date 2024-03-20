import React, { useState, useEffect } from "react";
import SeatComponent from "./SeatComponent";
import { Seat, ShowDetails } from "../models/Seat"; // Assuming ShowDetails is properly defined here
import "./SeatSelection.css";

export interface UISeat extends Seat {
  isSelected: boolean;
}

// Simple Modal Component for displaying selection details
const SelectionModal = ({ showDetails, selectedSeats }: { showDetails: ShowDetails | null; selectedSeats: UISeat[] }) => {
  // Optional chaining and a default message if showDetails or movie is undefined
  const theaterId = showDetails?.theater_id ?? 'Loading...';
  const showTitle = showDetails?.movie?.title ?? 'Loading...';
  const showStartTime = showDetails?.startTime ? new Date(showDetails.startTime).toLocaleString() : 'Loading...';

  return (
    <div className="selection-modal">
      <h2>Your purchase</h2>
      <p>{theaterId}</p>
      <p>Show: {showTitle}</p>
      <p>Date & Time: {showStartTime}</p>
      <h3>Selected Seats:</h3>
      {selectedSeats.length > 0 ? selectedSeats.map((seat) => (
        <p key={seat.id}>{`Row ${seat.seatRow}, Seat ${seat.seatNr}`}</p>
      )) : <p>No seats selected</p>}
    </div>
  );
};

const SeatSelection: React.FC = () => {
  const [seats, setSeats] = useState<UISeat[]>([]);
  const [showDetails, setShowDetails] = useState<ShowDetails | null>(null);

  // Fetch seats and show details
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

    // Inside your useEffect hook where you fetch the data
    fetch("http://localhost:8080/bookings")
      .then((response) => response.json())
      .then((data) => {
        // Assuming you want the first show details from the bookings array
        const firstBooking = data.find(
          (booking) => booking.id === "00000000-0000-3100-0000-000000000005"
        );
        setShowDetails(firstBooking.show);
      })
      .catch((error) => console.error("Error fetching show details:", error));
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

  const selectedSeats = seats.filter((seat) => seat.isSelected);

  const rows = seats.reduce((acc, seat) => {
    acc[seat.seatRow] = acc[seat.seatRow] || [];
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
      <div className="legend-item">
        <span className="legend-indicator vip"></span>VIP
      </div>
    </div>
  );

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
    <SelectionModal showDetails={showDetails} selectedSeats={selectedSeats} />
  </div>
)};


export default SeatSelection;