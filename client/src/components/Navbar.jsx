import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  // FUNCTIONALITY: Logic for the Get a Quote button
  const handleQuoteClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    // If on homepage, smooth scroll to contact section
    if (location.pathname === '/') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate home then scroll
      navigate('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const links = [
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Packages', to: '/packages' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.04)' : 'none',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
      }}>
        <div style={{
          maxWidth: 1600,
          margin: '0 auto',
          padding: scrolled ? '16px 64px' : '32px 64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>

          {/* LOGO */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', overflow: 'hidden',
              background: '#00adee', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'all 0.4s ease',
              boxShadow: scrolled ? 'none' : '0 0 0 1px rgba(255, 255, 255, 0.15)',
            }}>
              <img src="/logo.png" alt="MakeBuilders"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<span style="color:#fff;font-weight:600;font-size:12px;font-family:Poppins,sans-serif">MB</span>';
                }} />
            </div>
            <span style={{
              fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 17,
              letterSpacing: '0.02em', color: scrolled ? '#1a1a1a' : '#ffffff', transition: 'color 0.4s',
            }}>
              Make<span style={{ fontWeight: 300, color: '#00adee' }}>Builders</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 48 }} className="nav-desktop">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} scrolled={scrolled} active={location.pathname === l.to}>
                {l.label}
              </NavLink>
            ))}

            <Link to="/admin/login" style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 400,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: scrolled ? '#888' : 'rgba(255, 255, 255, 0.5)',
              textDecoration: 'none',
              border: `1px solid ${scrolled ? 'rgba(0,0,0,0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
              padding: '8px 20px', transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#00adee'; e.currentTarget.style.borderColor = '#00adee'; }}
            onMouseLeave={e => {
              e.currentTarget.style.color = scrolled ? '#888' : 'rgba(255, 255, 255, 0.5)';
              e.currentTarget.style.borderColor = scrolled ? 'rgba(0,0,0,0.1)' : 'rgba(255, 255, 255, 0.2)';
            }}>
              Admin
            </Link>

            {/* UPDATED: GET A QUOTE BUTTON */}
            <button 
              onClick={handleQuoteClick} 
              style={{
                fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 500,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                background: '#00adee', color: '#fff', padding: '14px 30px',
                border: 'none', cursor: 'pointer', transition: 'all 0.4s ease', display: 'inline-block',
                boxShadow: scrolled ? '0 10px 20px -5px rgba(0, 173, 238, 0.3)' : 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0090c8'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#00adee'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              Get a Quote
            </button>
          </nav>

          {/* HAMBURGER */}
          <button className="nav-mobile" onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'none' }}
            aria-label="Menu">
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 1.5,
                background: scrolled ? '#1a1a1a' : '#fff',
                margin: '6px 0', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
                transformOrigin: 'center',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                    : i === 1 ? 'scaleX(0)' : 'rotate(-45deg) translate(5px, -5px)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '100vh' : 0,
          transition: 'max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: scrolled ? 'blur(30px)' : 'none',
        }}>
          <div style={{ padding: '40px 64px' }}>
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', fontFamily: "'Poppins', sans-serif", fontSize: 13,
                  fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: location.pathname === l.to ? '#00adee' : '#1a1a1a',
                  padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', textDecoration: 'none',
                }}>
                {l.label}
              </Link>
            ))}
            {/* UPDATED MOBILE BUTTON */}
            <button 
              onClick={handleQuoteClick}
              style={{
                display: 'block', width: '100%', textAlign: 'center', marginTop: '30px',
                background: '#00adee', color: '#fff', border: 'none',
                fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 500,
                letterSpacing: '0.2em', textTransform: 'uppercase', padding: '18px', cursor: 'pointer'
              }}>
              Get a Quote
            </button>
          </div>
        </div>
      </header>

      <style>{`
        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: block !important; }
        }
        @media (max-width: 768px) {
          header > div { padding: 16px 32px !important; }
        }
      `}</style>
    </>
  );
};

const NavLink = ({ to, children, scrolled, active }) => {
  const [hov, setHov] = useState(false);
  return (
    <Link to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 400,
        letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none',
        color: hov || active ? '#00adee' : scrolled ? '#666' : 'rgba(255, 255, 255, 0.7)',
        transition: 'color 0.3s ease', position: 'relative',
      }}>
      {children}
      <span style={{
        position: 'absolute', bottom: -6, left: '50%',
        width: hov || active ? '100%' : '0%', height: 1,
        background: '#00adee', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: 'translateX(-50%)'
      }} />
    </Link>
  );
};

export default Navbar;
