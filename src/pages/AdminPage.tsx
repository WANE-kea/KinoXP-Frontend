import { useState } from "react";
import MovieForm from "../components/MovieForm";
import "./adminPage.css";
import ShowForm from "../components/ShowForm";
import CategoryForm from "../components/CategoryForm";
import SeatStatus from "../components/SeatStatus";

export default function AdminPage(){
    const [selectedView, setSelectedView] = useState("info");
    function handleSelected(selected: string) {
      setSelectedView(selected);
    }

    type ButtonProps = {
      onSelected: (selected: string) => void;
    };
    
      const Buttons = (props: ButtonProps) => {
        const { onSelected: handleSelected} = props;
        return (
          <>
            <button style={{width:"100%", marginTop:"5px"}} onClick={() => handleSelected("info")}>
              Info
            </button>
            <button style={{width:"100%",  marginTop:"5px"}} onClick={() => handleSelected("createMovie")}>
              Create Movie Entry
            </button>
            <button style={{width:"100%",  marginTop:"5px"}} onClick={() => handleSelected("createShow")}>
              Create Show Entry
            </button>
            <button style={{ width: "100%", marginTop: "5px" }} onClick={() => handleSelected("createCategory")}>
              Create Category
            <button style={{width:"100%",  marginTop:"5px"}} onClick={() => handleSelected("updateSeat")}>
              Update Seat status
            </button>
          </>
        );
  }

return (
    <>
      <div className="outer-div-style">
        <div className="header-style">
          <h2>Kino-XP</h2>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, padding: 10 }}>
            <Buttons onSelected={handleSelected} />
          </div>
          <div className="component-container">
            {selectedView == "info" ? <p>Kino-XP-Admin. Here you can manage your cinema.</p> : null}
            {selectedView == "createMovie" ? <MovieForm/> : null}
            {selectedView == "createShow" ? <ShowForm/> : null}
            {selectedView == "createCategory" ? <CategoryForm /> : null}
            {selectedView == "updateSeat" ? <SeatStatus/> : null}
          </div>
        </div>
      </div>
    </>
  );
}
