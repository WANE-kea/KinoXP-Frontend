import { useEffect, useState } from "react";
import { Show } from "../models/interfaces";
import { getAllShows } from "../services/apiFacade";

export default function BuyTicketsButton({ showId, handleTicketPurchase }) {
  const [, setShow] = useState<Show | null>(null);

  useEffect(() => {
    getAllShows().then((res) => setShow(res.find((show) => show.id === showId)));
  }, [showId]);

  return (
    <>
      <ul>
        <button onClick={() => handleTicketPurchase(showId)}></button>
      </ul>
    </>
  );
}
