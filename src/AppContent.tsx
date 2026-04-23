import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Products from './sections/Products';
import Services from './sections/Services';
import Pricing from './sections/Pricing';
import WhyChooseUs from './sections/WhyChooseUs';
import BuildEstimator from './sections/BuildEstimator';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function AppContent() {
  const lenisRef = useRef<Lenis | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', () => ScrollTrigger.update());
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const handleNavigate = useCallback((id: string) => {
    if (id === 'estimator') {
      navigate('/estimator/concrete');
      return;
    }
    const element = document.getElementById(id);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: 0, duration: 1.2 });
    }
  }, [navigate]);

  return (
    <div className="relative">
      <Navigation onNavigate={handleNavigate} />
      <Hero onNavigate={handleNavigate} />
      <Products />
      <Services />
      <Pricing />
      <WhyChooseUs />
      <BuildEstimator />
      <Contact />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
