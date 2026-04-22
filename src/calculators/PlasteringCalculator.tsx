import { useState } from 'react';
import { formatNumber, InputField, ResultCard, SelectField } from './shared';

const THICKNESS_OPTIONS = [
  { value: '6', label: '6 mm (Internal walls)' },
  { value: '12', label: '12 mm (Standard)' },
  { value: '18', label: '18 mm (External walls)' },
  { value: '25', label: '25 mm (Rough finish)' },
];

const MIX_OPTIONS = [
  { value: '1:3', label: '1:3 (Rich mix - finishing)' },
  { value: '1:4', label: '1:4 (Standard plastering)' },
  { value: '1:5', label: '1:5 (Economy mix)' },
  { value: '1:6', label: '1:6 (Rough plastering)' },
];

export default function PlasteringCalculator() {
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [thickness, setThickness] = useState('12');
  const [mix, setMix] = useState('1:4');
  const [results, setResults] = useState<null | {
    area: number;
    cement: number;
    sand: number;
  }>(null);

  const calculate = () => {
    const l = parseFloat(length) || 0;
    const h = parseFloat(height) || 0;
    const t = parseFloat(thickness) || 12;
    if (!l || !h) return;

    const areaSqft = l * h;
    const areaSqm = areaSqft * 0.0929;

    // Dry volume factor for plastering ≈ 1.33
    const volM3 = areaSqm * (t / 1000) * 1.33;

    const [c, s] = mix.split(':').map(Number);
    const totalParts = c + s;

    // Cement bags
    const cementVol = (volM3 * c) / totalParts;
    const cementBags = cementVol / 0.035;

    // Sand tons (1.6 t/m³)
    const sandVol = (volM3 * s) / totalParts;
    const sandTons = sandVol * 1.6;

    setResults({ area: areaSqft, cement: cementBags, sand: sandTons });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1A2B47] mb-1">Plastering Calculator</h2>
      <p className="text-sm text-[rgba(26,43,71,0.5)] mb-6">Estimate cement & sand for wall plastering</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <InputField label="Wall Length" value={length} onChange={setLength} unit="ft" placeholder="e.g. 30" />
        <InputField label="Wall Height" value={height} onChange={setHeight} unit="ft" placeholder="e.g. 10" />
        <SelectField label="Plaster Thickness" value={thickness} onChange={setThickness} options={THICKNESS_OPTIONS} />
        <SelectField label="Cement : Sand Ratio" value={mix} onChange={setMix} options={MIX_OPTIONS} />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-[#C23B22] hover:bg-[#1A2B47] text-white py-3 rounded-lg font-semibold transition-colors duration-200"
      >
        Calculate Materials
      </button>

      {results && (
        <div className="mt-6">
          <p className="text-sm font-medium text-[#1A2B47] mb-3">Total Area: {formatNumber(results.area)} sq ft</p>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Cement" value={formatNumber(results.cement)} unit="bags (50kg)" highlight />
            <ResultCard label="Sand (M-Sand)" value={formatNumber(results.sand)} unit="tons" />
          </div>
        </div>
      )}
    </div>
  );
}
