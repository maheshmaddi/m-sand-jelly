import { useState } from 'react';
import { formatNumber, InputField, ResultCard, SelectField, WhatsAppQuoteButton } from './shared';

const THICKNESS_OPTIONS = [
  { value: '6', label: '6 mm — Very thin (rarely used)' },
  { value: '12', label: '12 mm — Standard for internal walls' },
  { value: '18', label: '18 mm — External walls & rough surfaces' },
  { value: '25', label: '25 mm — Very rough finish / levelling' },
];

const MIX_OPTIONS = [
  { value: '1:3', label: '1:3 — Rich mix (smooth finishing)' },
  { value: '1:4', label: '1:4 — Standard (most common)' },
  { value: '1:5', label: '1:5 — Economy mix' },
  { value: '1:6', label: '1:6 — Rough plastering' },
];

export default function PlasteringCalculator() {
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [thickness, setThickness] = useState('12');
  const [mix, setMix] = useState('1:4');
  const [results, setResults] = useState<null | { area: number; cement: number; sand: number }>(null);

  const calculate = () => {
    const l = parseFloat(length) || 0;
    const h = parseFloat(height) || 0;
    const t = parseFloat(thickness) || 12;
    if (!l || !h) return;

    const areaSqft = l * h;
    const areaSqm = areaSqft * 0.0929;
    const volM3 = areaSqm * (t / 1000) * 1.33;

    const [c, s] = mix.split(':').map(Number);
    const totalParts = c + s;
    const cementVol = (volM3 * c) / totalParts;
    const cementBags = cementVol / 0.035;
    const sandVol = (volM3 * s) / totalParts;
    const sandTons = sandVol * 1.6;

    setResults({ area: areaSqft, cement: cementBags, sand: sandTons });
  };

  const whatsappMsg = results
    ? `Hi, I need materials for plastering:\n\n📐 Wall area: ${formatNumber(results.area)} sq ft\n📦 Cement: ${formatNumber(results.cement)} bags\n🏖️ Sand: ${formatNumber(results.sand)} tons\n\nPlease share a quote.`
    : '';

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1A2B47] mb-1">Plastering Calculator</h2>
      <p className="text-sm text-[rgba(26,43,71,0.5)] mb-6">
        Calculate cement and sand needed to plaster walls — both inside and outside.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <InputField
          label="Total Wall Length"
          value={length} onChange={setLength} unit="ft" placeholder="e.g. 30"
          helpText="Add up all wall lengths you want to plaster. Example: 4 walls of 10ft each = 40ft"
        />
        <InputField
          label="Wall Height"
          value={height} onChange={setHeight} unit="ft" placeholder="e.g. 10"
          helpText="Floor-to-ceiling height. Typical Indian homes: 10 ft"
        />
        <SelectField
          label="Plaster Thickness"
          value={thickness} onChange={setThickness} options={THICKNESS_OPTIONS}
          helpText="Thicker plaster = more material. 12mm is standard for inside walls"
        />
        <SelectField
          label="Cement : Sand Ratio"
          value={mix} onChange={setMix} options={MIX_OPTIONS}
          helpText="1:4 is most common. Higher sand = cheaper but weaker"
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
          <p className="text-sm font-medium text-[#1A2B47] mb-3">Total Wall Area: {formatNumber(results.area)} sq ft</p>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Cement" value={formatNumber(results.cement)} unit="bags (50kg each)" highlight />
            <ResultCard label="Sand (M-Sand)" value={formatNumber(results.sand)} unit="tons" />
          </div>
          <WhatsAppQuoteButton message={whatsappMsg} />
        </div>
      )}
    </div>
  );
}
