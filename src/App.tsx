import import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Program from "./pages/ProgramPage";
// import Film from "./pages/KommendeFilmPage";
// import Login from "./pages/LoginPage";
// import Logout from "./pages/LogoutPage";
import NotFound from "./pages/NotFoundPage";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Program />} /> */}
        {/* <Route path="/film" element={<Film />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}