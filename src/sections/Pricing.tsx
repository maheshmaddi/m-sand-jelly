import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const pricingData = [
  { product: 'Robo Sand Double Wash', spec: 'Double washed, premium grade', price: '₹950' },
  { product: 'Jelly 20mm', spec: 'Crushed stone, 20mm size', price: '₹750' },
  { product: 'Jelly 40mm', spec: 'Crushed stone, 40mm size', price: '₹450' },
  { product: 'Single Wash M-Sand', spec: 'Single washed, general use', price: '₹750' },
  { product: 'Air Wash Dust', spec: 'Fine dust, air processed', price: '₹500' },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Label and heading
            const label = entry.target.querySelector('.pricing-label');
            const heading = entry.target.querySelector('.pricing-heading');
            const table = entry.target.querySelector('.pricing-table-wrap');

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
            if (table) {
              gsap.fromTo(
                table,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
              );
            }

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
      id="pricing"
      ref={sectionRef}
      className="bg-[#F9F7F0] py-24 md:py-32 px-6"
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="pricing-label inline-block text-[#C23B22] text-xs font-semibold uppercase tracking-[0.15em] opacity-0">
            TRANSPARENT PRICING
          </span>
          <h2
            className="pricing-heading text-[#1A2B47] font-semibold mt-3 opacity-0"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            Best Rates in the Market
          </h2>
        </div>

        {/* Price Table */}
        <div className="pricing-table-wrap opacity-0">
          <div className="rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              {/* Header */}
              <thead>
                <tr className="bg-[#1A2B47]">
                  <th className="text-left text-white text-[13px] font-semibold uppercase tracking-[0.08em] px-6 py-4">
                    Product
                  </th>
                  <th className="text-left text-white text-[13px] font-semibold uppercase tracking-[0.08em] px-6 py-4 hidden sm:table-cell">
                    Specification
                  </th>
                  <th className="text-right text-white text-[13px] font-semibold uppercase tracking-[0.08em] px-6 py-4">
                    Price (per ton)
                  </th>
                </tr>
              </thead>
              {/* Body */}
              <tbody>
                {pricingData.map((row, index) => (
                  <tr
                    key={row.product}
                    className={`price-row ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9F7F0]'}`}
                  >
                    <td className="text-[#1A2B47] text-[15px] font-normal px-6 py-[18px]">
                      {row.product}
                    </td>
                    <td className="text-[rgba(26,43,71,0.7)] text-[15px] font-normal px-6 py-[18px] hidden sm:table-cell">
                      {row.spec}
                    </td>
                    <td className="text-right text-[#C23B22] text-base font-bold px-6 py-[18px]">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Delivery Note */}
          <p className="text-[rgba(26,43,71,0.6)] text-[13px] mt-4">
            * Bulk delivery available. Prices subject to change based on location and order volume. Call{' '}
            <a href="tel:9964666749" className="text-[#C23B22] hover:underline">
              9964666749
            </a>{' '}
            for exact quote.
          </p>
        </div>
      </div>
    </section>
  );
}
