import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface NavigationProps {
  onNavigate: (id: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Stagger nav links in after hero animation
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('.nav-item');
      gsap.fromTo(
        links,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out', delay: 3 }
      );
    }
  }, []);

  const navLinks = [
    { label: 'Products', target: 'products' },
    { label: 'Services', target: 'services' },
    { label: 'About', target: 'why-us' },
    { label: 'Contact', target: 'contact' },
    { label: 'Material Estimator', target: 'estimator' },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] transition-colors duration-400"
      style={{
        backgroundColor: scrolled ? '#1A2B47' : 'transparent',
        transition: 'background-color 0.4s ease',
      }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2"
        >
          <img src="./images/logo.jpg" alt="PrimeBuild" className="h-10 w-10 rounded-full object-cover" />
          <span className="text-white font-semibold text-lg uppercase tracking-[0.12em]">PRIMEBUILD</span>
        </button>

        {/* Links */}
        {/* Desktop Links */}
        <div ref={linksRef} className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => { onNavigate(link.target); setMobileOpen(false); }}
              className="nav-item nav-link text-white/80 hover:text-white text-sm uppercase tracking-[0.08em] font-normal transition-colors duration-300 opacity-0"
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:9964666749"
            className="nav-item opacity-0 bg-[#C23B22] hover:bg-[#F5A623] text-white hover:text-[#1A2B47] px-5 py-2 rounded-full text-[13px] font-semibold uppercase tracking-[0.04em] transition-all duration-300"
          >
            Call Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            ) : (
              <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 top-16 bg-black/40 z-[-1]" onClick={() => setMobileOpen(false)} />
          <div className="md:hidden absolute top-16 left-0 w-full bg-[#1A2B47] px-6 pb-6 pt-2 shadow-xl z-[101]">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => { onNavigate(link.target); setMobileOpen(false); }}
              className="block w-full text-left text-white/80 hover:text-white text-sm uppercase tracking-[0.08em] py-3 border-b border-white/10 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:9964666749"
            className="block mt-4 bg-[#C23B22] text-white px-5 py-2.5 rounded-full text-[13px] font-semibold uppercase tracking-[0.04em] text-center"
          >
            Call Now
          </a>
        </div>
        </>
      )}
    </nav>
  );
}
