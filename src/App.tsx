import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutUsPage from "./pages/AboutUsPage";
import Genres from "./pages/GenresPage";
import Login from "./security/Login";
import Logout from "./security/Logout";
import NotFound from "./pages/NotFoundPage";
import Program from "./pages/ProgramPage";
import { useAuth } from "./security/AuthProvider";
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import MoviePage from "./pages/MoviePage";

export default function App() {
  const auth = useAuth();
  auth.isLoggedIn();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Program />} />
        <Route path="/movies">
          <Route index element={<UpcomingMoviesPage />} />
          <Route path=":id" element={<MoviePage />} />
        </Route>
        <Route path="/genres" element={<Genres />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
