import { useState } from 'react';
import { PRICES, formatNumber, InputField, ResultCard, WhatsAppQuoteButton } from './shared';

const materials = [
  { key: 'roboSand', label: 'Robo Sand Double Wash', price: 950, unit: 'tons', desc: 'Premium double-washed M-Sand for concrete & plastering' },
  { key: 'jelly20mm', label: 'Jelly 20mm', price: 750, unit: 'tons', desc: '20mm crushed stone for RCC slabs and foundations' },
  { key: 'jelly40mm', label: 'Jelly 40mm', price: 450, unit: 'tons', desc: '40mm coarse aggregate for base layers and heavy work' },
  { key: 'msandSingle', label: 'Single Wash M-Sand', price: 750, unit: 'tons', desc: 'Economy M-Sand for brickwork and block masonry' },
  { key: 'airWashDust', label: 'Air Wash Dust', price: 500, unit: 'tons', desc: 'Fine dust for levelling, filling & base preparation' },
];

export default function CostEstimator() {
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [results, setResults] = useState<null | { items: { label: string; qty: number; cost: number }[]; total: number }>(null);

  const calculate = () => {
    const items = materials
      .map((m) => {
        const qty = parseFloat(quantities[m.key] || '0') || 0;
        return { label: m.label, qty, cost: qty * m.price };
      })
      .filter((item) => item.qty > 0);

    const total = items.reduce((sum, item) => sum + item.cost, 0);
    setResults({ items, total });
  };

  const updateQty = (key: string, value: string) => {
    setQuantities((prev) => ({ ...prev, [key]: value }));
  };

  const whatsappMsg = results
    ? `Hi, I'd like to order:\n\n${results.items.map((i) => `${i.label}: ${formatNumber(i.qty)} — ₹${formatNumber(i.cost)}`).join('\n')}\n\nTotal: ₹${formatNumber(results.total)}\n\nPlease confirm availability and delivery.`
    : '';

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1A2B47] mb-1">Material Cost Estimator</h2>
      <p className="text-sm text-[rgba(26,43,71,0.5)] mb-6">
        Enter quantities for each material to get an instant cost estimate with our current prices.
      </p>

      <div className="space-y-4 mb-4">
        {materials.map((m) => (
          <div key={m.key}>
            <InputField
              label={`${m.label} — ₹${m.price}/${m.unit === 'bags' ? 'bag' : 'ton'}`}
              value={quantities[m.key] || ''}
              onChange={(v) => updateQty(m.key, v)}
              unit={m.unit}
              placeholder="0"
              helpText={m.desc}
            />
          </div>
        ))}
      </div>

      <button
        onClick={calculate}
        className="w-full bg-[#C23B22] hover:bg-[#1A2B47] text-white py-3 rounded-lg font-semibold transition-colors duration-200"
      >
        Calculate Cost
      </button>

      {results && (
        <div className="mt-6">
          <div className="space-y-2 mb-4">
            {results.items.map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm text-[#1A2B47]">{item.label}</p>
                  <p className="text-xs text-[rgba(26,43,71,0.4)]">Qty: {formatNumber(item.qty)}</p>
                </div>
                <p className="font-semibold text-[#1A2B47]">₹{formatNumber(item.cost)}</p>
              </div>
            ))}
          </div>
          <ResultCard label="Estimated Total" value={`₹${formatNumber(results.total)}`} highlight />
          <p className="text-xs text-[rgba(26,43,71,0.4)] mt-3 text-center">
            * Prices are approximate. Delivery charges may apply based on location.
          </p>
          <WhatsAppQuoteButton message={whatsappMsg} />
        </div>
      )}
    </div>
  );
}
