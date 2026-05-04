import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CityDetails from './pages/CityDetails';
import Contact from './pages/Contact';
import Chatbot from './components/Chatbot';
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/city/:cityName" element={<CityDetails />} />
        <Route path="/contact" element={<Contact />} />

        {/* 404 PAGE */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6 bg-primary">

              <h1 className="text-accent/20 font-display text-[clamp(80px,15vw,180px)] leading-none">
                404
              </h1>

              <h2 className="text-white text-3xl font-display">
                Page Not Found
              </h2>

              <p className="text-white/40 text-sm max-w-xs">
                The page you're looking for doesn’t exist.
              </p>

              {/* FIX: use Link instead of <a> */}
              <Link
                to="/"
                className="bg-accent text-black px-8 py-3 text-xs uppercase tracking-widest hover:opacity-90 transition"
              >
                Back to Home
              </Link>

            </div>
          }
        />

      </Routes>
      <Chatbot />
      <Footer />

    </BrowserRouter>

  );
}

export default App;