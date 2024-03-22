// seat.ts
export interface Seat {
  id: string;
  seatRow: string;
  seatNr: number;
  available: boolean;
  type: string;
  isSelected?: boolean;
  isReserved?: boolean;
}

// ShowDetails interface to include bookings
export interface ShowDetails {
  id: number;
  startTime: Date;
  endTime: Date;
  movie: {
    id: number;
    title: string;
    description: string;
    posterUrl: string;
    trailerUrl: string;
    ageLimit: number;
    duration: number;
    categories: Array<{ id: number; name: string }>;
  };
  theater_id: number;
  bookings: Array<{
    id: string;
    customer: {
      id: string;
      name: string;
    } | null;
    seats: Array<Seat>;
  }>;
}
