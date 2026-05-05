import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CityDetails from './pages/CityDetails';
import Contact from './pages/Contact';
import Chatbot from './components/Chatbot';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

/* ── Protected Route ─────────────────────────────────── */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ─── ADMIN ROUTES (no Navbar/Footer) ─────────── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* ─── PUBLIC ROUTES ────────────────────────────── */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/city/:cityName" element={<CityDetails />} />
                <Route path="/contact" element={<Contact />} />

                {/* 404 */}
                <Route
                  path="*"
                  element={
                    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6 bg-surface">
                      <span className="font-display font-700 leading-none select-none" style={{ fontSize: 'clamp(80px,15vw,180px)', color: 'rgba(0,173,238,0.15)' }}>
                        404
                      </span>
                      <h2 className="text-text text-3xl font-display">
                        Page Not Found
                      </h2>
                      <p className="text-muted text-sm max-w-xs">
                        The page you're looking for doesn't exist.
                      </p>
                      <Link
                        to="/"
                        className="bg-accent text-white px-8 py-3 text-xs uppercase tracking-widest font-ui font-700 hover:bg-accentDark transition-colors"
                      >
                        Back to Home
                      </Link>
                    </div>
                  }
                />
              </Routes>
              <Chatbot />
              <Footer />
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;