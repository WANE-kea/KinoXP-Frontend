interface Booking {
  id: string;
  customer: Customer[];
  show: Show[];
  seats: Seat[];
}
interface Category {
  id?: number;
  name: string;
}
interface Customer {
  firstName: string;
  middleName?: string;
  lastName: string;
  streetAddress: string;
  streetNo: string;
  zip: string;
  country: string;
  phone: string;
}

interface Movie {
  id?: number;
  title: string;
  description: string;
  posterBase64?: string;
  trailerUrl?: string;
  posterUrl?: string;
  ageLimit: number;
  duration: number;
  categories: string[];
}

interface Seat {
  id?: number;
  seatRow: string;
  seatNr: number;
  available: boolean;
  theater_id: number;
  type: string;
  isSelected?: boolean; // Optional property to track selection state
}

interface Show {
  id?: number;
  startTime: Date;
  movie: Movie;
  theater_id: number;
  bookings: Booking[];
}
interface Theater {
  id: number;
  name: string;
  seats: Seat[];
}


export type { Booking, Category, Movie, Seat, Show, Theater, Customer };
