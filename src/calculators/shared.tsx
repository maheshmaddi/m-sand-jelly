// Material prices (per ton unless specified)
export const PRICES = {
  roboSand: 950,
  jelly20mm: 750,
  jelly40mm: 450,
  msandSingle: 750,
  airWashDust: 500,
  cement: 380, // per 50kg bag (approx)
};

// Standard mix ratios (cement : sand : aggregate) by volume
export const MIX_RATIOS: Record<string, { label: string; cement: number; sand: number; aggregate: number }> = {
  M15: { label: 'M15 (1:2:4)', cement: 1, sand: 2, aggregate: 4 },
  M20: { label: 'M20 (1:1.5:3)', cement: 1, sand: 1.5, aggregate: 3 },
  M25: { label: 'M25 (1:1:2)', cement: 1, sand: 1, aggregate: 2 },
};

export function formatNumber(n: number): string {
  return n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

export function InputField({
  label,
  value,
  onChange,
  unit,
  min = 0,
  step,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  min?: number;
  step?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1A2B47] mb-1">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          step={step}
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[#1A2B47] focus:outline-none focus:ring-2 focus:ring-[#C23B22]/30 focus:border-[#C23B22] transition-all text-sm"
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(26,43,71,0.4)] text-xs">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export function ResultCard({ label, value, unit, highlight }: { label: string; value: string; unit?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? 'bg-[#C23B22]/5 border border-[#C23B22]/20' : 'bg-[#F9F7F0]'}`}>
      <p className="text-xs text-[rgba(26,43,71,0.5)] uppercase tracking-wide">{label}</p>
      <p className={`text-xl font-bold mt-1 ${highlight ? 'text-[#C23B22]' : 'text-[#1A2B47]'}`}>
        {value} {unit && <span className="text-sm font-normal text-[rgba(26,43,71,0.5)]">{unit}</span>}
      </p>
    </div>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1A2B47] mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[#1A2B47] focus:outline-none focus:ring-2 focus:ring-[#C23B22]/30 focus:border-[#C23B22] transition-all text-sm bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
