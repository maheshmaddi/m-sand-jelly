import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Truck, Scale, ShieldCheck, Phone } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: 'Bulk Delivery',
    description: 'Timely delivery of sand and aggregates directly to your construction site across all locations.',
  },
  {
    icon: Scale,
    title: 'Accurate Quantity',
    description: 'Get exactly what you pay for with precise tonnage measurement on every order.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assured',
    description: 'All materials undergo double wash and quality checks to meet construction standards.',
  },
  {
    icon: Phone,
    title: 'Order by Phone',
    description: 'One call to 9964666749 and your materials are on the way. Hassle-free ordering.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate label and heading
            const label = entry.target.querySelector('.services-label');
            const heading = entry.target.querySelector('.services-heading');
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

            // Stagger cards
            const cards = entry.target.querySelectorAll('.service-card');
            gsap.fromTo(
              cards,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
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
      id="services"
      ref={sectionRef}
      className="bg-white py-24 md:py-32 px-6"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="services-label inline-block text-[#C23B22] text-xs font-semibold uppercase tracking-[0.15em] opacity-0">
            WHAT WE OFFER
          </span>
          <h2
            className="services-heading text-[#1A2B47] font-semibold mt-3 opacity-0"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            Complete Material Supply Solutions
          </h2>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-card bg-[#F9F7F0] rounded-lg p-8 text-center opacity-0"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center">
                  <Icon className="w-10 h-10 text-[#F5A623]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#1A2B47] font-semibold text-lg mt-4">{service.title}</h3>
                <p className="text-[rgba(26,43,71,0.7)] text-sm mt-2">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
