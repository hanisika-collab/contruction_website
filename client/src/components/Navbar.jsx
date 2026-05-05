import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Portfolio', href: '#projects' },
    { label: 'Packages', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-border shadow-sm py-3'
          : 'bg-white/80 backdrop-blur-md py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="font-ui text-lg font-extrabold tracking-wide text-text">
          ACE<span className="text-accent">CONSTRUCT</span>
        </a>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors duration-200 font-ui font-500"
            >
              {l.label}
            </a>
          ))}

          {/* ADMIN BUTTON */}
          <Link
            to="/admin/login"
            className="text-xs uppercase tracking-widest border border-border text-muted hover:text-accent hover:border-accent px-4 py-2 transition-colors duration-200 font-ui"
          >
            Admin
          </Link>

          {/* GET A QUOTE */}
          <a
            href="#contact"
            className="bg-accent text-white px-6 py-2.5 text-xs uppercase tracking-widest font-ui font-700 hover:bg-accentDark transition-colors duration-200"
          >
            Get a Quote
          </a>
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Menu"
        >
          <span className={`w-6 h-[2px] bg-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-[2px] bg-text transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-[2px] bg-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden transition-all duration-400 overflow-hidden ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-white border-t border-border px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-muted py-3 border-b border-border hover:text-accent transition-colors font-ui"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/admin/login"
            onClick={() => setMenuOpen(false)}
            className="text-sm uppercase tracking-widest text-muted py-3 border-b border-border hover:text-accent transition-colors font-ui"
          >
            Admin Login
          </Link>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-3 bg-accent text-white text-center py-3 uppercase text-sm tracking-widest font-ui font-700 hover:bg-accentDark transition-colors"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;