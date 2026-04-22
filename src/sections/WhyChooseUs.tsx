import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const features = [
  {
    badge: '01',
    title: 'Competitive Pricing',
    description: 'Direct-from-quarry rates with no middlemen. Best prices for robo sand, jelly, and M-sand in the region.',
  },
  {
    badge: '02',
    title: 'On-Time Delivery',
    description: 'We understand construction timelines. Your materials arrive when promised, every single time.',
  },
  {
    badge: '03',
    title: 'Premium Quality',
    description: 'Every batch is washed, graded, and inspected. Only materials that meet our high standards leave the yard.',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Label and heading
            const label = entry.target.querySelector('.why-label');
            const heading = entry.target.querySelector('.why-heading');
            if (label) {
              gsap.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
            }
            if (heading) {
              gsap.fromTo(
                heading,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.15 }
              );
            }

            // Stagger feature cards
            const cards = entry.target.querySelectorAll('.feature-card');
            gsap.fromTo(
              cards,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.3 }
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
      id="why-us"
      ref={sectionRef}
      className="bg-[#141E30] py-24 md:py-32 px-6"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="why-label inline-block text-[#F5A623] text-xs font-semibold uppercase tracking-[0.15em] opacity-0">
            WHY PRIMEBUILD
          </span>
          <h2
            className="why-heading text-white font-semibold mt-3 opacity-0"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            The Trusted Choice for Construction Materials
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.badge}
              className="feature-card text-center px-8 py-8 opacity-0"
            >
              {/* Number Badge */}
              <div className="w-12 h-12 mx-auto rounded-full bg-[rgba(245,166,35,0.15)] flex items-center justify-center">
                <span className="text-[#F5A623] font-bold text-xl">{feature.badge}</span>
              </div>
              <h3 className="text-white font-semibold text-lg mt-5">{feature.title}</h3>
              <p className="text-[rgba(255,255,255,0.7)] text-sm mt-3">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
