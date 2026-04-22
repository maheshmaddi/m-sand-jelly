import { useEffect, useRef, useCallback } from 'react';
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

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // RAF loop for Lenis
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleNavigate = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: 0, duration: 1.2 });
    }
  }, []);

  return (
    <div className="relative">
      <Navigation onNavigate={handleNavigate} />
      <Hero onNavigate={handleNavigate} />
      <Products />
      <Services />
      <Pricing />
      <WhyChooseUs />
      <Contact />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
