// seat.ts
export interface Seat {
  id: string;
  seatRow: string;
  seatNr: number;
  available: boolean;
  theater_id: number;
  type: string;
  isSelected?: boolean; 
}

export interface ShowDetails {
  id: number;
  startTime: string;
  endTime: string;
  movie: {
    title: string;
    description: string;
    posterUrl: string;
    trailerUrl: string;
    ageLimit: number;
    duration: number;
    categories: Array<{ id: number; name: string }>;
  };
  theater_id: number;
}