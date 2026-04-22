import { useEffect, useRef, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Products from './sections/Products';
import Services from './sections/Services';
import Pricing from './sections/Pricing';
import WhyChooseUs from './sections/WhyChooseUs';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Calculators from './Calculators';

gsap.registerPlugin(ScrollTrigger);

function HomePage({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <Products />
      <Services />
      <Pricing />
      <WhyChooseUs />
      <Contact />
    </>
  );
}

export default function AppContent() {
  const lenisRef = useRef<Lenis | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', () => ScrollTrigger.update());
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleNavigate = useCallback((id: string) => {
    if (id === 'calculators') {
      navigate('/calculators');
      return;
    }
    // If on calculators page, go home first
    if (location.pathname === '/calculators') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el && lenisRef.current) lenisRef.current.scrollTo(el, { offset: 0, duration: 1.2 });
      }, 100);
      return;
    }
    const element = document.getElementById(id);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: 0, duration: 1.2 });
    }
  }, [navigate, location]);

  return (
    <div className="relative">
      <Navigation onNavigate={handleNavigate} />
      <Routes>
        <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
        <Route path="/calculators" element={<Calculators />} />
      </Routes>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
