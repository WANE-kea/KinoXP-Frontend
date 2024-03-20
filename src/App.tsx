import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutUsPage from "./pages/AboutUsPage";
import GenresPage from "./pages/GenresPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignUp from "./security/SignUp";
import NotFoundPage from "./pages/NotFoundPage";
import ProgramPage from "./pages/ProgramPage";
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import SeatSelection from "./components/SeatSelection";

import { useAuth } from "./security/AuthProvider";
import MoviePage from "./pages/MoviePage";
import RequireAuth from "./security/RequireAuth";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const auth = useAuth();
  auth.isLoggedIn();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProgramPage />} />
        <Route path="/movies">
          <Route index element={<UpcomingMoviesPage />} />
          <Route path=":id" element={<MoviePage />} />
        </Route>
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/admin"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminPage />
            </RequireAuth>
          }
        />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
