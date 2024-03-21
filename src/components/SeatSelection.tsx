import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SeatComponent from "./SeatComponent";
import { Seat } from "../models/Seat";
import "./SeatSelection.css";
import { getShowById, getTheaterById } from "../services/apiFacade";
import { Show } from "../models/interfaces";

export interface UISeat extends Seat {
  isSelected: boolean;
  isReserved: boolean;
}
//ShowDetails
const SelectionModal = ({ showDetails, selectedSeats }: { showDetails: Show | null; selectedSeats: UISeat[] }) => {
  const showTitle = showDetails?.movie?.title ?? "Loading...";
  const showStartTime = showDetails?.startTime ? new Date(showDetails.startTime).toLocaleString() : "Loading...";

  return (
    <div className="selection-modal">
      <h2>Your purchase</h2>
      <p>Show: {showTitle}</p>
      <p>Date & Time: {showStartTime}</p>
      <h3>Selected Seats:</h3>
      {selectedSeats.length > 0 ? (
        selectedSeats.map((seat) => <p key={seat.id}>{`Row ${seat.seatRow}, Seat ${seat.seatNr}`}</p>)
      ) : (
        <p>No seats selected</p>
      )}
    </div>
  );
};

const SeatSelection: React.FC = () => {
  const { movieIdString } = useParams<{ movieIdString: string }>();

  const movieId: number = parseInt(movieIdString, 10);

  const [seats, setSeats] = useState<UISeat[]>([]);
  const [showDetails, setShowDetails] = useState<Show | null>(null);
  useEffect(() => {
    const fetchSeatsAndShowDetails = async () => {
      try {
        if (movieId) {
          // Fetch show details
          const showResponse = getShowById(movieId);
          const showData: Show = await showResponse;
          setShowDetails(showData);

          // Fetch seats for the theater
          const seatsResponse = getTheaterById(showData.theater_id);
          const theaterData = await seatsResponse;
          const theaterSeats: Seat[] = theaterData.seats;

          // Create a set to track reserved seat IDs from all bookings for this show
          const reservedSeatIds = new Set();
          showData.bookings.forEach((booking) => {
            booking.seats.forEach((seat) => {
              reservedSeatIds.add(seat.id);
            });
          });

          // Map over the seats from the theater and update their reserved status
          const updatedSeats = theaterSeats.map((seat) => ({
            ...seat,
            isSelected: false,
            isReserved: reservedSeatIds.has(seat.id), // Check if the seat ID is in the reservedSeatIds set
          }));

          setSeats(updatedSeats as UISeat[]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSeatsAndShowDetails();
  }, [movieId]);

  const handleSeatClick = (seatId: string) => {
    setSeats((prevSeats) => prevSeats.map((seat) => (seat.id === seatId ? { ...seat, isSelected: !seat.isSelected } : seat)));
  };

  const selectedSeats = seats.filter((seat) => seat.isSelected);

  // Convert the array of seats into a map of rows to seats
  const rows = seats.reduce((acc: { [key: string]: UISeat[] }, seat) => {
    if (!acc[seat.seatRow]) acc[seat.seatRow] = [];
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
          <path d="M 0 9 Q 73 -3 143 9 Q 142 12 141 14 Q 73 4 2 14 Z" style={{ fill: "#dcdcdc" }} />
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
              className={seat.isReserved ? "reserved" : seat.isSelected ? "selected" : ""}
            />
          ))}
          <div className="row-label">{rowLabel}</div>
        </div>
      ))}
      {seatLegend}
      <SelectionModal showDetails={showDetails} selectedSeats={selectedSeats} />
    </div>
  );
};

export default SeatSelection;
