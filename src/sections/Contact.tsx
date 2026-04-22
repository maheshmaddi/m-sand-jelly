import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.contact-animate');
            gsap.fromTo(
              elements,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-white py-24 md:py-32 px-6"
    >
      <div className="max-w-[720px] mx-auto text-center">
        <span className="contact-animate inline-block text-[#C23B22] text-xs font-semibold uppercase tracking-[0.15em] opacity-0">
          GET IN TOUCH
        </span>
        <h2
          className="contact-animate text-[#1A2B47] font-semibold mt-3 opacity-0"
          style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
        >
          Order Your Materials Today
        </h2>
        <p className="contact-animate text-[rgba(26,43,71,0.7)] text-base mt-3 opacity-0">
          Call us now for instant quotes and same-day delivery
        </p>

        {/* Phone CTA */}
        <div className="contact-animate mt-9 opacity-0">
          <a
            href="tel:9964666749"
            className="inline-flex items-center gap-3 bg-[#F5A623] hover:bg-[#C23B22] text-[#1A2B47] hover:text-white px-10 py-4 rounded-full font-semibold text-xl transition-all duration-300 hover:scale-[1.03]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            9964666749
          </a>
        </div>

        {/* Second Contact Number */}
        <div className="contact-animate mt-4 opacity-0">
          <a
            href="tel:9620096104"
            className="inline-flex items-center gap-3 border-2 border-[#F5A623] hover:bg-[#F5A623] text-[#1A2B47] px-10 py-4 rounded-full font-semibold text-xl transition-all duration-300 hover:scale-[1.03]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            96200 96104
          </a>
        </div>

        {/* Address */}
        <div className="contact-animate mt-8 opacity-0 flex items-start justify-center gap-3 text-left max-w-md mx-auto">
          <svg className="w-5 h-5 text-[#C23B22] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <p className="text-[rgba(26,43,71,0.7)] text-sm leading-relaxed">
            #19, Sy No 108/2, Mega Venture,<br />
            Electronic City Phase 1, Kempapura,<br />
            Begur Koppa Main Road,<br />
            Bangalore - 560105
          </p>
        </div>

        {/* Secondary Info */}
        <p className="contact-animate text-[rgba(26,43,71,0.6)] text-sm mt-6 opacity-0">
          S Reddy & Brothers | M-Sand & Jelly Suppliers
        </p>
      </div>
    </section>
  );
}
