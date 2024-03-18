type Movie = {
    id: number;
    title: string;
    description: string;
    posterBase64: string | undefined;
    trailerUrl: string | null;
    posterUrl: string | undefined;
    ageRating: number;
    duration: number;
    categories: string[];    
}

interface Booking {   
    id: string;   
    customer: Customer;   
    show: Show;   
    seats: Seat[]; 
}
 
interface Category {   
    id: number | null;   
    name: string; 
} 

interface Seat {   
    id: number | null;   
    seatRow: number;   
    seatNr: number;   
    available: boolean;   
    theater: Theater;   
    type: string; 
} 

interface Show {   
    id: number | null;   
    startTime: Date;   
    endTime: Date;   
    movie: Movie;   
    theater: Theater; 
} 

interface Theater {   
    id: number;   
    name: string; 
    seats: Seat[];
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

export type { Booking, Category, Movie, Seat, Show, Theater, Customer };