interface FooterProps {
  onNavigate: (id: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const footerLinks = [
    { label: 'Products', target: 'products' },
    { label: 'Services', target: 'services' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <footer className="bg-[#1A2B47] px-6 py-10">
      <div className="max-w-[1280px] mx-auto">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white font-semibold text-base uppercase tracking-[0.12em]">
            PRIMEBUILD
          </span>
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => onNavigate(link.target)}
                className="text-[rgba(255,255,255,0.6)] hover:text-white text-[13px] uppercase tracking-[0.06em] transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[rgba(255,255,255,0.1)] my-6" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[rgba(255,255,255,0.4)] text-xs">
            &copy; 2025 S Reddy & Brothers. All rights reserved.
          </span>
          <a
            href="tel:9964666749"
            className="text-[rgba(255,255,255,0.6)] hover:text-white text-[13px] transition-colors duration-300"
          >
            9964666749
          </a>
        </div>
      </div>
    </footer>
  );
}
