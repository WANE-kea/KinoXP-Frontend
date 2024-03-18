interface Booking {
  id: string;
  customer: Customer[];
  show: Show[];
  seats: Seat[];
}
interface Category {
  id: number | null;
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

type Movie = {
    id: number;
    title: string;
    description: string;
    posterBase64: string | undefined;
    trailerUrl: string | null;
    posterUrl: string | undefined;
    ageLimit: number;
    duration: number;
    categories: string[];    
}

interface Seat {
  id: string;
  seatRow: string;
  seatNr: number;
  available: boolean;
  theater_id: number;
  type: string;
  isSelected?: boolean; // Optional property to track selection state
}


interface Show {
  id: number | null;
  startTime: Date;
  endTime: Date;
  movie: Movie[];
  theater: Theater[];
}
interface Theater {
  id: number;
  name: string;
}
interface Customer {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  streetAddress: string;
  streetNo: string;
  zip: string;
  country: string;
  phone: string;
}



export type { Booking, Category, Movie, Seat, Show, Theater, Customer };

