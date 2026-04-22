import { useEffect, useRef } from 'react';
import gsap from 'gsap';

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.product-card');
            gsap.fromTo(
              elements,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" ref={sectionRef} className="bg-[#F9F7F0] py-20 md:py-28 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-[#C23B22] text-xs font-semibold uppercase tracking-[0.15em]">
            OUR PRODUCTS
          </span>
          <h2
            className="text-[#1A2B47] font-semibold mt-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            Premium Construction Materials
          </h2>
          <p className="text-[rgba(26,43,71,0.6)] mt-3 text-base max-w-[520px] mx-auto">
            Competitive prices, same-day delivery guaranteed
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="product-card opacity-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1A2B47] text-white text-[11px] font-semibold uppercase tracking-[0.1em] px-3 py-1 rounded-full">
                  {product.label}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[#1A2B47] font-semibold text-lg">{product.name}</h3>
                <p className="text-[rgba(26,43,71,0.6)] text-sm mt-2 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[#C23B22] font-bold text-xl">{product.price}</span>
                  <a
                    href="tel:9964666749"
                    className="bg-[#C23B22] hover:bg-[#F5A623] text-white hover:text-[#1A2B47] px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-300"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
