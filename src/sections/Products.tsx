import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: 'Robo Sand Double Wash',
    description: 'High-quality manufactured sand, double washed for maximum purity. Ideal for concrete and plastering.',
    price: '₹950 / ton',
    image: '/images/product-robo-sand.jpg',
    label: 'ROBO SAND',
  },
  {
    name: 'Jelly 20mm',
    description: 'Premium 20mm crushed stone aggregates. Perfect for RCC work, slabs, and foundations.',
    price: '₹750 / ton',
    image: '/images/product-jelly-20mm.jpg',
    label: 'JELLY 20MM',
  },
  {
    name: 'Jelly 40mm',
    description: 'Coarse 40mm crushed stone for heavy-duty construction and base layers.',
    price: '₹450 / ton',
    image: '/images/product-jelly-40mm.jpg',
    label: 'JELLY 40MM',
  },
  {
    name: 'Single Wash M-Sand',
    description: 'Cost-effective manufactured sand with single wash. Great for brickwork and block masonry.',
    price: '₹750 / ton',
    image: '/images/product-msand-single.jpg',
    label: 'M-SAND',
  },
  {
    name: 'Air Wash Dust',
    description: 'Fine aggregate dust processed through air washing. Used for levelling and filling applications.',
    price: '₹500 / ton',
    image: '/images/product-air-wash-dust.jpg',
    label: 'AIR WASH DUST',
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Header reveal
    if (headerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const label = entry.target.querySelector('.products-label');
              const heading = entry.target.querySelector('.products-heading');
              if (label) {
                gsap.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
              }
              if (heading) {
                gsap.fromTo(
                  heading,
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
                );
              }
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(headerRef.current);
    }

    if (prefersReducedMotion) {
      // Show all text items
      textItemsRef.current.forEach((item) => {
        if (item) {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
          item.style.position = 'relative';
        }
      });
      return;
    }

    // GSAP ScrollTrigger horizontal card slide
    if (sectionRef.current && cardRef.current) {
      const ctx = gsap.context(() => {
        // Animate card horizontally
        gsap.fromTo(
          cardRef.current,
          { x: '60vw' },
          {
            x: '-15vw',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );

        // Track which product is active based on scroll progress
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const progress = self.progress;
            const newIndex = Math.min(
              Math.floor(progress * products.length),
              products.length - 1
            );
            if (newIndex !== currentIndexRef.current) {
              // Deactivate previous
              const prev = textItemsRef.current[currentIndexRef.current];
              if (prev) prev.classList.remove('product--current');
              // Activate new
              const next = textItemsRef.current[newIndex];
              if (next) next.classList.add('product--current');
              currentIndexRef.current = newIndex;
            }
          },
        });
      }, sectionRef);

      // Activate first product initially
      const first = textItemsRef.current[0];
      if (first) first.classList.add('product--current');

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative bg-[#F9F7F0]"
      style={{ height: '400vh' }}
    >
      {/* Section Header */}
      <div ref={headerRef} className="pt-24 pb-12 px-6 text-center max-w-[1280px] mx-auto">
        <span className="products-label inline-block text-[#C23B22] text-xs font-semibold uppercase tracking-[0.15em] opacity-0">
          OUR PRODUCTS
        </span>
        <h2 className="products-heading text-[#1A2B47] font-semibold mt-3 opacity-0" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
          Premium Construction Materials at Competitive Prices
        </h2>
      </div>

      {/* Sticky Showcase */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="h-full flex items-center max-w-[1280px] mx-auto px-6">
          {/* Left: Text Descriptions */}
          <div className="w-[40%] pr-8 relative" style={{ minHeight: '200px' }}>
            {products.map((product, index) => (
              <div
                key={product.name}
                ref={(el) => { textItemsRef.current[index] = el; }}
                className="text-item"
              >
                <h3 className="text-[#1A2B47] font-semibold text-xl">{product.name}</h3>
                <p className="text-[rgba(26,43,71,0.7)] text-[15px] mt-3 max-w-[360px]">
                  {product.description}
                </p>
                <span className="inline-block text-[#C23B22] font-bold text-[32px] mt-4">
                  {product.price}
                </span>
              </div>
            ))}
          </div>

          {/* Right: Horizontally Sliding Card */}
          <div className="w-[60%] flex justify-center">
            <div
              ref={cardRef}
              className="w-[380px] flex-shrink-0 will-change-transform"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Dynamic image based on active product */}
                {products.map((product, index) => (
                  <div
                    key={product.image}
                    className="transition-opacity duration-500"
                    style={{
                      opacity: currentIndexRef.current === index ? 1 : 0,
                      display: currentIndexRef.current === index ? 'block' : 'none',
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                ))}
                {/* Always show current product image */}
                <img
                  src={products[currentIndexRef.current]?.image || products[0].image}
                  alt={products[currentIndexRef.current]?.name || products[0].name}
                  className="w-full h-[400px] object-cover"
                />
                <div className="py-4 text-center">
                  <span className="text-[#1A2B47] font-semibold text-[13px] uppercase tracking-[0.1em]">
                    {products[currentIndexRef.current]?.label || products[0].label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
