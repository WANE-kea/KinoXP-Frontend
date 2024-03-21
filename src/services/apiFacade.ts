import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
import * as interfaces from "../models/interfaces";
const BOOKING_URL = API_URL + "/booking";
const CATEGORY_URL = API_URL + "/categories";
const MOVIE_URL = API_URL + "/movies";
const SEAT_URL = API_URL + "/seats";
const SHOW_URL = API_URL + "/shows";
const THEATER_URL = API_URL + "/theaters";

let bookings: interfaces.Booking[] = [];
let categories: interfaces.Category[] = [];
let movies: interfaces.Movie[] = [];
let seats: interfaces.Seat[] = [];
let shows: interfaces.Show[] = [];
let theaters: interfaces.Theater[] = [];
let customers: interfaces.Customer[] = [];

async function getAllBookings(): Promise<interfaces.Booking[]> {
  try {
    const response = await fetch(BOOKING_URL).then(handleHttpErrors);
    const data = await response.json();
    bookings = data;
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

async function getBookingByBookingNr(bookingNr: string): Promise<interfaces.Booking> {
  try {
    const response = await fetch(BOOKING_URL + "/" + bookingNr).then(handleHttpErrors);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
}

async function handleBooking(booking: interfaces.Booking): Promise<interfaces.Booking> {
  try {
    // Determine whether to use POST or PUT based on whether the booking has an ID
    const method = booking.id ? "PUT" : "POST";

    // Construct options for the fetch request
    const options = makeOptions(method, booking, true);

    // Determine the URL based on whether it's a new booking or an update
    const url = booking.id ? `${BOOKING_URL}/${booking.id}` : BOOKING_URL;

    // Send the request to the server and handle any errors
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    // Log and re-throw any errors that occur during the process
    console.error("Error handling booking:", error);
    throw error;
  }
}

async function deleteBooking(bookingNr: string): Promise<interfaces.Booking> {
  try {
    const options = makeOptions("DELETE", null, true);
    const response = await fetch(BOOKING_URL + "/" + bookingNr, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}

async function getAllCategories(): Promise<interfaces.Category[]> {
  try {
    const response = await fetch(CATEGORY_URL).then(handleHttpErrors);
    categories = response;
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

async function getCategoryById(id: number): Promise<interfaces.Category> {
  try {
    const response = await fetch(CATEGORY_URL + "/" + id).then(handleHttpErrors);
    return response;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
}

async function handleCategory(category){
  try {
    const method = category.id ? "PUT" : "POST";
    const options = makeOptions(method, category, true);
    const url = category.id ? `${CATEGORY_URL}/${category.id}` : CATEGORY_URL;
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error("Error handling category:", error);
    throw error;
  }
}

async function deleteCategory(id: number): Promise<interfaces.Category> {
  try {
    const options = makeOptions("DELETE", null, true);
    const response = await fetch(CATEGORY_URL + "/" + id, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

async function getAllMovies(): Promise<interfaces.Movie[]> {
  try {
    const response = await fetch(MOVIE_URL).then(handleHttpErrors);
    movies = response;
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

async function getMovieById(id: number): Promise<interfaces.Movie> {
  try {
    const response = await fetch(MOVIE_URL + "/" + id).then(handleHttpErrors);
    return response;
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
}

async function handleMovie(movie: interfaces.Movie) {
  try {
    const method = movie.id ? "PUT" : "POST";
    const options = makeOptions(method, movie, true);
    const url = movie.id ? `${MOVIE_URL}/${movie.id}` : MOVIE_URL;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error handling movie:", error);
    throw error;
  }
}

async function deleteMovie(id: number): Promise<interfaces.Movie> {
  try {
    const options = makeOptions("DELETE", null, true);
    const response = await fetch(MOVIE_URL + "/" + id, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
}

async function getAllSeats(): Promise<interfaces.Seat[]> {
  try {
    const response = await fetch(SEAT_URL).then(handleHttpErrors);
    seats = response;
    return seats;
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
}

async function handleSeat(seat: interfaces.Seat): Promise<interfaces.Seat> {
  try {
    const method = seat.id ? "PUT" : "POST";
    const options = makeOptions(method, seat, true);
    const url = seat.id ? `${SEAT_URL}/${seat.id}` : SEAT_URL;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error handling seat:", error);
    throw error;
  }
}

async function deleteSeat(id: number){
  try {
    const options = makeOptions("DELETE", null, true);
    const response = await fetch(SEAT_URL + "/" + id, options);
    return response;
  } catch (error) {
    console.error("Error deleting seat:", error);
    throw error;
  }
}

async function getAllShows(): Promise<interfaces.Show[]> {
  try {
    const response = await fetch(SHOW_URL).then(handleHttpErrors);
    shows = response;
    return shows;
  } catch (error) {
    console.error("Error fetching shows:", error);
    throw error;
  }
}

async function getShowById(id: number): Promise<interfaces.Show> {
  try {
    const response = await fetch(SHOW_URL + "/" + id).then(handleHttpErrors);
    return response;
  } catch (error) {
    console.error("Error fetching show:", error);
    throw error;
  }
}

async function handleShow(show: interfaces.Show) {
  try {
    const method = show.id ? "PUT" : "POST";
    const options = makeOptions(method, show, true);
    const url = show.id ? `${SHOW_URL}/${show.id}` : SHOW_URL;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error handling show:", error);
    throw error;
  }
}

async function deleteShow(id: number): Promise<interfaces.Show> {
  try {
    const options = makeOptions("DELETE", null, true);
    const response = await fetch(SHOW_URL + "/" + id, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting show:", error);
    throw error;
  }
}

async function getAllTheaters(): Promise<interfaces.Theater[]> {
  try {
    const response = await fetch(THEATER_URL).then(handleHttpErrors);
    theaters = response;
    return theaters;
  } catch (error) {
    console.error("Error fetching theaters:", error);
    throw error;
  }
}

async function getTheaterById(id: number): Promise<interfaces.Theater> {
  try {
    const response = await fetch(THEATER_URL + "/" + id).then(handleHttpErrors);
    return response;
  } catch (error) {
    console.error("Error fetching theater:", error);
    throw error;
  }
}

async function handleTheater(theater: interfaces.Theater): Promise<interfaces.Theater> {
  try {
    const method = theater.id ? "PUT" : "POST";
    const options = makeOptions(method, theater, true);
    const url = theater.id ? `${THEATER_URL}/${theater.id}` : THEATER_URL;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error handling theater:", error);
    throw error;
  }
}

async function deleteTheater(id: number): Promise<interfaces.Theater> {
  try {
    const options = makeOptions("DELETE", null, true);
    const response = await fetch(THEATER_URL + "/" + id, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting theater:", error);
    throw error;
  }
}

async function getAllCustomers(): Promise<interfaces.Customer[]> {
  try {
    const response = await fetch(API_URL + "/customers").then(handleHttpErrors);
    const data = await response.json();
    customers = data;
    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
}

async function getCustomerById(email: string): Promise<interfaces.Customer> {
  try {
    const response = await fetch(API_URL + "/customers/" + email).then(handleHttpErrors);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
}

async function handleCustomer(customer: interfaces.Customer): Promise<interfaces.Customer> {
  try {
    const method = customer.email ? "PUT" : "POST";
    const options = makeOptions(method, customer, true);
    const url = customer.email ? `${API_URL}/customers/${customer.email}` : API_URL + "/customers";
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error handling customer:", error);
    throw error;
  }
}

async function deleteCustomer(email: string): Promise<interfaces.Customer> {
  try {
    const options = makeOptions("DELETE", null, true);
    const response = await fetch(API_URL + "/customers/" + email, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
}

export {
  getAllBookings,
  getBookingByBookingNr,
  handleBooking,
  deleteBooking,
  getAllCategories,
  getCategoryById,
  handleCategory,
  deleteCategory,
  getAllMovies,
  getMovieById,
  handleMovie,
  deleteMovie,
  getAllSeats,
  handleSeat,
  deleteSeat,
  getAllShows,
  getShowById,
  handleShow,
  deleteShow,
  getAllTheaters,
  getTheaterById,
  handleTheater,
  deleteTheater,
  getAllCustomers,
  getCustomerById,
  handleCustomer,
  deleteCustomer,
};