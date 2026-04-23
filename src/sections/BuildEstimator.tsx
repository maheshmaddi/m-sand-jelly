import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router';

const tabs = [
  { id: 'concrete', label: 'Concrete Mix', icon: '🧱', desc: 'Slabs, foundations & columns' },
  { id: 'plastering', label: 'Plastering', icon: '🧱', desc: 'Wall plastering' },
  { id: 'brickwork', label: 'Brick Work', icon: '🏗️', desc: 'Wall construction' },
  { id: 'area', label: 'Area & Volume', icon: '📐', desc: 'Unit conversions' },
  { id: 'cost', label: 'Cost Estimator', icon: '💰', desc: 'Material cost breakdown' },
];

export default function BuildEstimator() {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.est-animate');
            gsap.fromTo(
              elements,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="estimator" ref={sectionRef} className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <span className="est-animate inline-block text-[#C23B22] text-xs font-semibold uppercase tracking-[0.15em] opacity-0">
            PLAN YOUR PROJECT
          </span>
          <h2
            className="est-animate text-[#1A2B47] font-semibold mt-3 opacity-0"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            Material Estimator
          </h2>
          <p className="est-animate text-[rgba(26,43,71,0.6)] mt-3 text-base max-w-[520px] mx-auto opacity-0">
            Not sure how much material you need? Use our free calculators to estimate quantities before you order.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => navigate(`/estimator/${tab.id}`)}
              className={`est-animate opacity-0 text-left bg-[#F9F7F0] hover:bg-[#C23B22] rounded-xl p-5 group transition-all duration-300 hover:shadow-lg ${
                i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <span className="text-3xl">{tab.icon}</span>
              <h3 className="text-[#1A2B47] group-hover:text-white font-semibold text-lg mt-3 transition-colors">{tab.label}</h3>
              <p className="text-[rgba(26,43,71,0.5)] group-hover:text-white/70 text-sm mt-1 transition-colors">{tab.desc}</p>
              <span className="inline-block mt-3 text-[#C23B22] group-hover:text-white text-xs font-semibold uppercase tracking-wide transition-colors">
                Open Calculator →
              </span>
            </button>
          ))}
        </div>

        <div className="est-animate text-center mt-10 opacity-0">
          <p className="text-[rgba(26,43,71,0.5)] text-sm mb-3">Need help? We'll calculate for you!</p>
          <a
            href="https://wa.me/919964666749?text=Hi%2C%20I%20need%20help%20estimating%20materials%20for%20my%20construction%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
