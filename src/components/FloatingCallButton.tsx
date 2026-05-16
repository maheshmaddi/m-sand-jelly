import { Phone } from 'lucide-react';

export default function FloatingCallButton() {
  return (
    <a
      href="tel:9964666749"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105 animate-bounce"
      style={{ animationIterationCount: 3, animationDuration: '1.5s' }}
      aria-label="Call us"
    >
      <Phone className="h-5 w-5" />
      <span className="font-semibold">Call Us</span>
    </a>
  );
}
