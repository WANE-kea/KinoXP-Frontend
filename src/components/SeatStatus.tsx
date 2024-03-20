import { useEffect, useState } from "react";
import { deleteSeat, getAllSeats, handleSeat } from "../services/apiFacade";


export default function SeatStatus() {
    const [selectedSeat, setSelectedSeat] = useState({});
    const [selectedSeatType, setSelectedSeatType] = useState();
    const [selectedSeatAvailable, setSelectedSeatAvailable] = useState();
    const [seats, setSeats] = useState([]);
    const [filter, setFilter] = useState(0);

    const handleSeatSelect = (seat) => {
        setSelectedSeat(seat);
        setSelectedSeatType(seat.type);
        setSelectedSeatAvailable(seat.available);
    };

    useEffect(() => {
        getAllSeats().then((data) => {
            data.sort((a, b) => a.theater_id - b.theater_id);
            setSeats(data);
            console.log(data);
        })}
    , []);

    const handleChange = (event) => {
        if(event.target.name === "available"){
           setSelectedSeatAvailable(event.target.checked);
        }else if(event.target.name === "type") {
            setSelectedSeatType(event.target.value);
        }

        setSelectedSeat({...selectedSeat, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value});
    }

    const handleSubmit = () => {
        if(confirm("Are you sure you want to save changes?")){
            handleSeat(selectedSeat);
            resetForm();
        };
    }

    const handleDelete = () => {
        if(confirm("Are you sure you want to delete this seat?")){
            deleteSeat(selectedSeat.id);
            resetForm();
        };
    }

    const resetForm = () => {
        setSelectedSeat({});
        setSelectedSeatType();
        setSelectedSeatAvailable();

        getAllSeats().then((data) => {
            data.sort((a, b) => a.theater_id - b.theater_id);
            setSeats(data);
        });
    }

    const handleFilter = (event) => {
        setFilter(event.target.value);
        if(event.target.value === "0"){
            getAllSeats().then((data) => {
                data.sort((a, b) => a.theater_id - b.theater_id);
                setSeats(data);
            });
        } else {
            getAllSeats().then((data) => {
                data = data.filter((seat) => seat.theater_id == event.target.value);
                setSeats(data);
            });
        }
    }

    const seatColor = (theater_id) => {
        switch(theater_id){
            case 1:
                return "blue";
            case 2:
                return "yellow";
            case 3:
                return "red";
            default:
                return "black";
        }
    }


    return (
        <div>
            <h1>Seat Adminstration</h1>
            <p>Blue seats: theater 1</p>
            <p>Yellow seats: theater 2</p>
            <p>Red seats: theater 3</p>
            <select onChange={handleFilter} value={filter}>
                <option value="0">All</option>
                <option value="1">Theater 1</option>
                <option value="2">Theater 2</option>
                <option value="3">Theater 3</option>
            </select>
            <div>
                {seats.map((seat) => (
                    <button key={seat.id} onClick={() => handleSeatSelect(seat)} style={{color: seatColor(seat.theater_id)}}>
                        {seat.seatRow+"-"+seat.seatNr}
                    </button>
                ))}
            </div>

            {selectedSeat.id && (  
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
        </div>
    );
}