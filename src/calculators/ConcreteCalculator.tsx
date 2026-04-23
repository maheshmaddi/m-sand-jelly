import { useState } from 'react';
import { MIX_RATIOS, formatNumber, InputField, ResultCard, SelectField, WhatsAppQuoteButton } from './shared';

export default function ConcreteCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [mix, setMix] = useState('M20');
  const [results, setResults] = useState<null | {
    volume: number;
    cement: number;
    sand: number;
    aggregate: number;
    water: number;
  }>(null);

  const calculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = parseFloat(depth) || 0;
    if (!l || !w || !d) return;

    const ratio = MIX_RATIOS[mix];
    const volM3 = (l * w * d) / 100;
    const volCft = volM3 * 35.3147;
    const dryVol = volM3 * 1.54;
    const totalParts = ratio.cement + ratio.sand + ratio.aggregate;

    const cementVol = (dryVol * ratio.cement) / totalParts;
    const cementBags = cementVol / 0.035;
    const sandVol = (dryVol * ratio.sand) / totalParts;
    const sandTons = sandVol * 1.6;
    const aggVol = (dryVol * ratio.aggregate) / totalParts;
    const aggTons = aggVol * 1.5;
    const waterL = cementBags * 50 * 0.5;

    setResults({ volume: volCft, cement: cementBags, sand: sandTons, aggregate: aggTons, water: waterL });
  };

  const whatsappMsg = results
    ? `Hi, I need materials for concrete work:\n\n📐 Area: ${length}×${width} ft, Depth: ${depth} inches\n📦 Cement: ${formatNumber(results.cement)} bags\n🏖️ Sand: ${formatNumber(results.sand)} tons\n🪨 Jelly: ${formatNumber(results.aggregate)} tons\n\nPlease share a quote.`
    : '';

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1A2B47] mb-1">Concrete Mix Calculator</h2>
      <p className="text-sm text-[rgba(26,43,71,0.5)] mb-6">
        Estimate cement, sand & jelly for RCC slabs, foundations, beams and columns.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <InputField
          label="Length"
          value={length} onChange={setLength} unit="ft" placeholder="e.g. 20"
          helpText="Total length of the slab or foundation in feet"
        />
        <InputField
          label="Width"
          value={width} onChange={setWidth} unit="ft" placeholder="e.g. 15"
          helpText="Total width of the slab or foundation in feet"
        />
        <InputField
          label="Depth / Thickness"
          value={depth} onChange={setDepth} unit="inches" placeholder="e.g. 6" step="0.5"
          helpText="How thick the concrete layer is. Typical: 4–6 inches for slabs, 12–18 inches for footings"
        />
        <SelectField
          label="Concrete Mix Grade"
          value={mix} onChange={setMix}
          options={Object.entries(MIX_RATIOS).map(([k, v]) => ({ value: k, label: v.label }))}
          helpText="Higher grade = stronger concrete. M20 is standard for house construction"
        />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-[#C23B22] hover:bg-[#1A2B47] text-white py-3 rounded-lg font-semibold transition-colors duration-200"
      >
        Calculate Materials
      </button>

      {results && (
        <div className="mt-6">
          <p className="text-sm font-medium text-[#1A2B47] mb-3">Total Volume: {formatNumber(results.volume)} cubic ft ({formatNumber(results.volume / 35.3147)} m³)</p>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Cement" value={formatNumber(results.cement)} unit="bags (50kg each)" highlight />
            <ResultCard label="Sand (M-Sand)" value={formatNumber(results.sand)} unit="tons" />
            <ResultCard label="Jelly / Aggregate" value={formatNumber(results.aggregate)} unit="tons" />
            <ResultCard label="Water (approx)" value={formatNumber(results.water)} unit="litres" />
          </div>
          <WhatsAppQuoteButton message={whatsappMsg} />
        </div>
      )}
    </div>
  );
}
