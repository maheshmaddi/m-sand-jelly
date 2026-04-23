import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Show everything immediately
      if (labelRef.current) labelRef.current.style.opacity = '1';
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
      if (ctaRef.current) ctaRef.current.style.opacity = '1';
      if (chevronRef.current) chevronRef.current.style.opacity = '1';
      return;
    }

    // Step 1: Apply Splitting to the title
    if (titleRef.current) {
      const result = Splitting({ target: titleRef.current });
      const chars = result[0]?.chars || [];

      // Step 2: Label fade in
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      // Step 3: 3D Character fly-in animation
      chars.forEach((char: HTMLElement) => {
        gsap.fromTo(
          char,
          {
            opacity: 0,
            scale: 0.2,
            rotationX: -180,
            rotationY: -50,
            rotationZ: -200,
            xPercent: gsap.utils.random(-200, 200),
            yPercent: gsap.utils.random(-200, 200),
            z: -800,
          },
          {
            duration: 1.2,
            ease: 'expo.out',
            opacity: 1,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            xPercent: 0,
            yPercent: 0,
            z: 0,
            delay: 0.3 + gsap.utils.random(0, 1.5),
          }
        );
      });

      // Step 4: Subtitle at ~2.5s
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 2.5 }
      );

      // Step 5: CTA buttons at ~2.8s
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 2.8 }
      );

      // Step 6: Chevron at ~3.5s
      gsap.fromTo(
        chevronRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 0.6, ease: 'power2.out', delay: 3.5 }
      );
    }
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/construction-site.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(26,43,71,0.5) 0%, rgba(26,43,71,0.75) 60%, rgba(26,43,71,0.95) 100%)',
        }}
      />

      {/* White Gradient Mask at bottom */}
      <div
        className="absolute bottom-0 left-0 w-full h-[120px] z-[2]"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #F9F7F0 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-[3] text-center px-6 max-w-4xl mx-auto">
        {/* Label */}
        <span
          ref={labelRef}
          className="inline-block text-[#F5A623] text-xs font-semibold uppercase tracking-[0.2em] mb-6 opacity-0"
        >
          M-SAND & JELLY SUPPLIERS
        </span>

        {/* Title with 3D perspective */}
        <div className="hero-title">
          <h1
            ref={titleRef}
            data-splitting=""
            className="hero-title-inner text-white font-bold leading-[1.1] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(3rem, 7vw, 5rem)',
            }}
          >
            PREMIUM QUALITY BUILDING MATERIALS
          </h1>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-white/80 text-lg max-w-[560px] mx-auto mt-6 opacity-0"
        >
          Robo Sand, M-Sand, Jelly & Aggregates — Delivered to Your Site
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 opacity-0">
          <button
            onClick={() => onNavigate('products')}
            className="bg-[#C23B22] hover:bg-[#F5A623] text-white hover:text-[#1A2B47] px-8 py-3.5 rounded text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300"
          >
            VIEW PRODUCTS
          </button>
          <button
            onClick={() => onNavigate('calculators')}
            className="bg-[#F5A623] hover:bg-[#C23B22] text-[#1A2B47] hover:text-white px-8 py-3.5 rounded text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300"
          >
            📐 CALCULATORS
          </button>
          <a
            href="tel:9964666749"
            className="border border-white/40 hover:border-white hover:bg-white/10 text-white px-8 py-3.5 rounded text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300"
          >
            CALL NOW — 9964666749
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={chevronRef}
        className="absolute bottom-[140px] left-1/2 -translate-x-1/2 z-[3] opacity-0"
      >
        <div className="chevron-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-50"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
