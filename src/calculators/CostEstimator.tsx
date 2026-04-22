import { useState } from 'react';
import { PRICES, formatNumber, InputField, ResultCard } from './shared';

const materials = [
  { key: 'roboSand', label: 'Robo Sand Double Wash', price: PRICES.roboSand, unit: 'tons' },
  { key: 'jelly20mm', label: 'Jelly 20mm', price: PRICES.jelly20mm, unit: 'tons' },
  { key: 'jelly40mm', label: 'Jelly 40mm', price: PRICES.jelly40mm, unit: 'tons' },
  { key: 'msandSingle', label: 'Single Wash M-Sand', price: PRICES.msandSingle, unit: 'tons' },
  { key: 'airWashDust', label: 'Air Wash Dust', price: PRICES.airWashDust, unit: 'tons' },
  { key: 'cement', label: 'Cement (50kg bags)', price: PRICES.cement, unit: 'bags' },
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

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1A2B47] mb-1">Material Cost Estimator</h2>
      <p className="text-sm text-[rgba(26,43,71,0.5)] mb-6">Get an instant cost estimate based on your material requirements</p>

      <div className="space-y-3 mb-4">
        {materials.map((m) => (
          <div key={m.key} className="flex items-center gap-3">
            <div className="flex-1">
              <InputField
                label={`${m.label} (₹${m.price}/${m.unit === 'bags' ? 'bag' : 'ton'})`}
                value={quantities[m.key] || ''}
                onChange={(v) => updateQty(m.key, v)}
                unit={m.unit}
                placeholder="0"
              />
            </div>
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
            * Prices are approximate. Contact us for exact quotes and delivery charges.
          </p>
        </div>
      )}
    </div>
  );
}
