import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface BuildEstimatorProps {
  onNavigate: (id: string) => void;
}

import ConcreteCalculator from '../calculators/ConcreteCalculator';
import PlasteringCalculator from '../calculators/PlasteringCalculator';
import BrickWorkCalculator from '../calculators/BrickWorkCalculator';
import AreaVolumeCalculator from '../calculators/AreaVolumeCalculator';
import CostEstimator from '../calculators/CostEstimator';

const tabs = [
  { id: 'concrete', label: 'Concrete Mix', icon: '🧱', desc: 'Slabs, foundations & columns' },
  { id: 'plastering', label: 'Plastering', icon: '🧱', desc: 'Wall plastering' },
  { id: 'brickwork', label: 'Brick Work', icon: '🏗️', desc: 'Wall construction' },
  { id: 'area', label: 'Area & Volume', icon: '📐', desc: 'Unit conversions' },
  { id: 'cost', label: 'Cost Estimator', icon: '💰', desc: 'Material cost breakdown' },
];

export default function BuildEstimator({ onNavigate }: BuildEstimatorProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState('concrete');
  const [showCalculator, setShowCalculator] = useState(false);

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

  // If calculator is open, show full calculator UI
  if (showCalculator) {
    return (
      <section id="estimator" ref={sectionRef} className="bg-white py-16 px-4">
        <div className="max-w-[900px] mx-auto">
          <button
            onClick={() => setShowCalculator(false)}
            className="flex items-center gap-2 text-[#C23B22] hover:text-[#1A2B47] text-sm font-medium mb-6 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Back to Overview
          </button>

          <div className="text-center mb-8">
            <h2 className="text-[#1A2B47] font-semibold" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>
              Material Estimator
            </h2>
            <p className="text-[rgba(26,43,71,0.5)] mt-1 text-sm">Estimate quantities and costs for your project</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#C23B22] text-white shadow-md'
                    : 'bg-[#F9F7F0] text-[#1A2B47] hover:bg-[#1A2B47] hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Calculator */}
          <div className="bg-[#F9F7F0] rounded-2xl p-5 md:p-8">
            {activeTab === 'concrete' && <ConcreteCalculator />}
            {activeTab === 'plastering' && <PlasteringCalculator />}
            {activeTab === 'brickwork' && <BrickWorkCalculator />}
            {activeTab === 'area' && <AreaVolumeCalculator />}
            {activeTab === 'cost' && <CostEstimator />}
          </div>

          <div className="text-center mt-6">
            <a
              href="tel:9964666749"
              className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#C23B22] text-[#1A2B47] hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              📞 Call Now for Exact Quote
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Overview cards
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
              onClick={() => { setActiveTab(tab.id); setShowCalculator(true); }}
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
            href="https://wa.me/919960066749?text=Hi%2C%20I%20need%20help%20estimating%20materials%20for%20my%20construction%20project"
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
