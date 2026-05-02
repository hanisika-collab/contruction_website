import React, { useEffect, useState } from 'react';

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
          ? 'bg-primary/80 backdrop-blur-xl border-b border-white/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* LOGO */}
        <a className="font-ui text-lg font-extrabold tracking-wide text-white">
          ACE<span className="text-accent">CONSTRUCT</span>
        </a>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition"
            >
              {l.label}
            </a>
          ))}

          <a
            href="#contact"
            className="bg-accent text-black px-5 py-2.5 text-xs uppercase tracking-widest hover:opacity-90 transition"
          >
            Get a Quote
          </a>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className={`w-6 h-[2px] bg-white transition ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-[2px] bg-white transition ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-[2px] bg-white transition ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${
        menuOpen ? 'max-h-80' : 'max-h-0'
      }`}>
        <div className="bg-[#141414] border-t border-white/10 px-6 py-4 flex flex-col gap-3">

          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-white/50 py-2 border-b border-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 bg-accent text-black text-center py-3 uppercase text-sm tracking-widest"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;