import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutUsPage from './pages/AboutUsPage';
import GenresPage from './pages/GenresPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';
import ProgramPage from './pages/ProgramPage';
import UpcomingMoviesPage from './pages/UpcomingMoviesPage';
import SeatSelection from './components/SeatSelection'; 

import { useAuth } from './security/AuthProvider';

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
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/seat-selection" element={<SeatSelection />} /> 
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
