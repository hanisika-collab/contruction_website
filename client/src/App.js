import React from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Navbar    from './components/Navbar';
import Footer    from './components/Footer';
import Chatbot   from './components/Chatbot';

// Public Pages
import Home       from './pages/Home';
import Portfolio  from './pages/Portfolio';
import Packages   from './pages/Packages';
import Interiors  from './pages/Interiors';
import Commercial from './pages/Commercial';
import CityDetails from './pages/CityDetails';
import Contact    from './pages/Contact';

// Admin Pages
import AdminLogin     from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

/* ── Protected Route ─────────────────────────────────── */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Router>
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
                <Route path="/"            element={<Home />}        />
                <Route path="/portfolio"   element={<Portfolio />}   />
                <Route path="/packages"    element={<Packages />}    />
                <Route path="/interiors"   element={<Interiors />}   />
                <Route path="/commercial"  element={<Commercial />}  />
                <Route path="/contact"     element={<Contact />}     />
                <Route path="/city/:cityName" element={<CityDetails />} />

                {/* 404 */}
                <Route
                  path="*"
                  element={
                    <div
                      className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6"
                      style={{ background: 'linear-gradient(160deg, #0a0e17 0%, #0d1f35 100%)' }}
                    >
                      <span
                        className="font-display font-700 leading-none select-none"
                        style={{ fontSize: 'clamp(80px,15vw,180px)', color: 'rgba(0,173,238,0.1)' }}
                      >
                        404
                      </span>
                      <h2 className="text-white text-3xl font-display font-700">
                        Page Not Found
                      </h2>
                      <p className="text-white/40 text-sm max-w-xs font-body">
                        The page you're looking for doesn't exist.
                      </p>
                      <Link
                        to="/"
                        className="bg-accent text-white px-8 py-3 text-xs uppercase tracking-widest font-ui font-700 hover:bg-accentDark transition-colors"
                        style={{ boxShadow: '0 8px 24px rgba(0,173,238,0.35)', textDecoration: 'none' }}
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
    </Router>
  );
}

export default App;