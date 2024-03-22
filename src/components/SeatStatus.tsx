import { useEffect, useState } from "react";
import { deleteSeat, getAllSeats, handleSeat } from "../services/apiFacade";
import { UISeat } from "./SeatSelection";
import { Seat } from "../models/interfaces";

export default function SeatStatus() {
  //const [selectedSeat, setSelectedSeat] = useState({});
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedSeatType, setSelectedSeatType] = useState();
  const [selectedSeatAvailable, setSelectedSeatAvailable] = useState();
  const [filter, setFilter] = useState(1);
  const [rows, setRows] = useState<{ [key: string]: UISeat[] }>({});

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat);
    setSelectedSeatType(seat.type);
    setSelectedSeatAvailable(seat.available);
  };

  const handleChange = (event) => {
    if (event.target.name === "available") {
      setSelectedSeatAvailable(event.target.checked);
    } else if (event.target.name === "type") {
      setSelectedSeatType(event.target.value);
    }

    setSelectedSeat({ ...selectedSeat, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value });
  };

  const handleSubmit = () => {
    if (confirm("Are you sure you want to save changes?")) {
      handleSeat(selectedSeat);
      resetForm();
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this seat?")) {
      deleteSeat(parseInt(selectedSeat.id));
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedSeat(null);
    setSelectedSeatType(undefined);
    setSelectedSeatAvailable(undefined);

    getSeats();
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    getSeats();
  };

  const getSeats = () => {
    getAllSeats().then((data) => {
      data = data.filter((seat) => seat.theater_id == filter);

      const updatedRows = data.reduce((acc: { [key: string]: UISeat[] }, seat) => {
        if (!acc[seat.seatRow]) acc[seat.seatRow] = [];
        const uiSeat: UISeat = {
          id: seat.id,
          seatRow: seat.seatRow,
          seatNr: seat.seatNr,
          available: seat.available,
          //theater_id: seat.theater_id,
          type: seat.type,
          isSelected: false,
          isReserved: false,
        };
        acc[seat.seatRow].push(uiSeat);
        return acc;
      }, {});

      setRows(updatedRows);
    });
  };

  useEffect(() => {
    getSeats();
  }, [filter]);

  return (
    <div>
      <h1>Seat Adminstration</h1>
      <select onChange={handleFilter} value={filter}>
        <option value="1">Theater 1</option>
        <option value="2">Theater 2</option>
        <option value="3">Theater 3</option>
      </select>

      {selectedSeat && selectedSeat.id && (
        <div>
          <h2>Selected Seat</h2>
          <p>ID: {selectedSeat.id}</p>
          <form>
            <label>
              Type:
              <select name="type" value={selectedSeatType} onChange={handleChange}>
                <option value="REGULAR">Regular</option>
                <option value="VIP">VIP</option>
                <option value="HANDICAP">Handicap</option>
              </select>
            </label>
            <label>
              Available:
              <input type="checkbox" name="available" checked={selectedSeatAvailable} onChange={handleChange} />
            </label>
          </form>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
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
            {rows[rowLabel].map((seat) => (
              <button
                className="seat"
                key={seat.id}
                onClick={() => handleSeatSelect(seat)}
                style={{ backgroundColor: seat.available ? "green" : "red" }}
                data-number={seat.seatNr}
              ></button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
