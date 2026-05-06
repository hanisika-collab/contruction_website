import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [mounted,   setMounted]   = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Portfolio', href: '#projects' },
    { label: 'Packages',  href: '#pricing'  },
    { label: 'Contact',   href: '#contact'  },
  ];

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        background: scrolled
          ? 'rgba(255,255,255,0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(229,231,235,0.6)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.08)' : 'none',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(-8px)',
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: scrolled ? '14px 64px' : '24px 64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'padding 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}>

          {/* LOGO */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 40, height: 40,
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#00adee',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: scrolled ? 'none' : '0 0 0 1px rgba(255,255,255,0.2)',
            }}>
              <img
                src="/logo.png"
                alt="MakeBuilders"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<span style="color:#fff;font-weight:800;font-size:14px;font-family:Poppins,sans-serif">MB</span>';
                }}
              />
            </div>
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '0.02em',
              color: scrolled ? '#111827' : '#fff',
              transition: 'color 0.4s',
            }}>
              Make<span style={{ color: '#00adee' }}>Builders</span>
            </span>
          </a>

          {/* DESKTOP NAV */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 40 }} className="nav-desktop">
            {links.map(l => (
              <NavLink key={l.href} href={l.href} scrolled={scrolled}>{l.label}</NavLink>
            ))}

            <Link to="/admin/login" style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: scrolled ? '#9ca3af' : 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              border: `1px solid ${scrolled ? '#e5e7eb' : 'rgba(255,255,255,0.2)'}`,
              padding: '8px 18px',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#00adee'; e.currentTarget.style.borderColor = '#00adee'; }}
            onMouseLeave={e => {
              e.currentTarget.style.color = scrolled ? '#9ca3af' : 'rgba(255,255,255,0.5)';
              e.currentTarget.style.borderColor = scrolled ? '#e5e7eb' : 'rgba(255,255,255,0.2)';
            }}>
              Admin
            </Link>

            <a href="#contact" style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              background: '#00adee',
              color: '#fff',
              padding: '12px 28px',
              textDecoration: 'none',
              transition: 'all 0.25s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0090c8'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#00adee'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              Get a Quote
            </a>
          </nav>

          {/* HAMBURGER */}
          <button
            className="nav-mobile"
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'none' }}
            aria-label="Menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: 26, height: 2,
                background: scrolled ? '#111827' : '#fff',
                margin: '5px 0',
                transition: 'all 0.35s',
                transformOrigin: 'center',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                    : i === 1 ? 'scaleX(0) opacity(0)'
                    : 'rotate(-45deg) translate(5px, -5px)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? 360 : 0,
          transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1)',
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(24px)',
        }}>
          <div style={{ borderTop: '1px solid #e5e7eb', padding: '12px 32px 24px' }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#6b7280',
                  padding: '14px 0',
                  borderBottom: '1px solid #f3f4f6',
                  textDecoration: 'none',
                }}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                textAlign: 'center',
                marginTop: 16,
                background: '#00adee',
                color: '#fff',
                fontFamily: "'Poppins', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '14px',
                textDecoration: 'none',
              }}>
              Get a Quote
            </a>
          </div>
        </div>
      </header>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: block !important; }
        }
        @media (max-width: 768px) {
          header > div > div { padding: 16px 24px !important; }
        }
      `}</style>
    </>
  );
};

const NavLink = ({ href, children, scrolled }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: hov ? '#00adee' : scrolled ? '#6b7280' : 'rgba(255,255,255,0.85)',
        transition: 'color 0.25s',
        position: 'relative',
      }}
    >
      {children}
      <span style={{
        position: 'absolute',
        bottom: -4, left: 0,
        width: hov ? '100%' : '0%',
        height: 1,
        background: '#00adee',
        transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1)',
      }} />
    </a>
  );
};

export default Navbar;