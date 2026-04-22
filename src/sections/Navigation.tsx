import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface NavigationProps {
  onNavigate: (id: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

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
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] h-16 flex items-center transition-colors duration-400"
      style={{
        backgroundColor: scrolled ? '#1A2B47' : 'transparent',
        transition: 'background-color 0.4s ease',
      }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-white font-semibold text-lg uppercase tracking-[0.12em]"
        >
          PRIMEBUILD
        </button>

        {/* Links */}
        <div ref={linksRef} className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => onNavigate(link.target)}
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
      </div>
    </nav>
  );
}
