// seat.ts
export interface Seat {
  id: string;
  seatRow: string;
  seatNr: number;
  available: boolean;
  theater_id: number;
  type: string;
  isSelected?: boolean; // Optional property to track selection state
}
