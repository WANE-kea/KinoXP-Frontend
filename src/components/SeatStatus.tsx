import { ChangeEvent, useEffect, useState } from "react";
import { deleteSeat, getAllSeats, handleSeat } from "../services/apiFacade";
import { Seat } from "../models/interfaces";


export default function SeatStatus() {
    const emptySeat: Seat = {
        id: 0,
        seatNr: 0,
        seatRow: "",
        type: "REGULAR",
        available: true,
        theater_id: 1,
    };


    const [selectedSeat, setSelectedSeat] = useState<Seat>(emptySeat);
    const [selectedSeatType, setSelectedSeatType] = useState("REGULAR");
    const [selectedSeatAvailable, setSelectedSeatAvailable] = useState<boolean>();
    const [filter, setFilter] = useState(1);
    const [rows, setRows] = useState<{ [key: string]: Seat[] }>({});




  const handleSeatSelect = (seat:Seat) => {
    setSelectedSeat(seat);
    setSelectedSeatType(seat.type);
    setSelectedSeatAvailable(seat.available);
  };

const handleChange = (event:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.target.name === "available" && event.target.type === "checkbox") {
        setSelectedSeatAvailable((event.target as HTMLInputElement).checked);
    } else if (event.target.name === "type") {
        setSelectedSeatType(event.target.value);
    }

    setSelectedSeat({ ...selectedSeat, [event.target.name]: event.target.type === "checkbox" ? (event.target as HTMLInputElement).checked : event.target.value });
};

  const handleSubmit = () => {
    if (confirm("Are you sure you want to save changes?")) {
      handleSeat(selectedSeat);
      resetForm();
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this seat?")) {
        if(selectedSeat.id) {
            deleteSeat(selectedSeat.id);
            resetForm();
        } else
            alert("No seat selected");
    }
  };

  const resetForm = () => {
    setSelectedSeat(emptySeat);
    setSelectedSeatType("REGULAR");
    setSelectedSeatAvailable(true);

    getSeats();
  };

  const handleFilter = (event:ChangeEvent<HTMLSelectElement>) => {
    setFilter(Number(event.target.value));
    getSeats();
  };

  const getSeats = () => {
    getAllSeats().then((data) => {
        data = data.filter((seat) => seat.theater_id == filter);

        const updatedRows = data.reduce((acc: { [key: string]: Seat[] }, seat) => {
            if (!acc[seat.seatRow]) acc[seat.seatRow] = [];
            acc[seat.seatRow].push(seat);
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

            {selectedSeat.id!=undefined && selectedSeat.id > 0 && (  
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
                        <input
                            type="checkbox"
                            name="available"
                            checked={selectedSeatAvailable}
                            onChange={handleChange}
                        />
                    </label>
                </form>
                <button onClick={handleSubmit}>Save</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            )}
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
