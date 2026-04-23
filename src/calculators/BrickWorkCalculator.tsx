import { useState } from 'react';
import { formatNumber, InputField, ResultCard, SelectField, WhatsAppQuoteButton } from './shared';

const WALL_OPTIONS = [
  { value: '4.5', label: '4.5 inch — Half brick (partition walls)' },
  { value: '9', label: '9 inch — Full brick (main walls)' },
];

const MORTAR_OPTIONS = [
  { value: '1:4', label: '1:4 — Rich (load-bearing walls)' },
  { value: '1:5', label: '1:5 — Standard (most walls)' },
  { value: '1:6', label: '1:6 — Economy (non-load-bearing)' },
];

export default function BrickWorkCalculator() {
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [wallType, setWallType] = useState('9');
  const [mortar, setMortar] = useState('1:6');
  const [results, setResults] = useState<null | { bricks: number; cement: number; sand: number; area: number }>(null);

  const calculate = () => {
    const l = parseFloat(length) || 0;
    const h = parseFloat(height) || 0;
    const thick = parseFloat(wallType);
    if (!l || !h) return;

    const areaSqft = l * h;
    const areaSqm = areaSqft * 0.0929;
    const volM3 = areaSqm * (thick * 0.0254);

    const brickVol = 0.002; // standard brick with mortar
    const bricks = Math.ceil(volM3 / brickVol);

    const mortarVol = volM3 * 0.25;
    const dryMortarVol = mortarVol * 1.33;
    const [c, s] = mortar.split(':').map(Number);
    const totalParts = c + s;
    const cementBags = ((dryMortarVol * c) / totalParts) / 0.035;
    const sandTons = ((dryMortarVol * s) / totalParts) * 1.6;

    setResults({ bricks, cement: cementBags, sand: sandTons, area: areaSqft });
  };

  const whatsappMsg = results
    ? `Hi, I need materials for brick work:\n\n📐 Wall: ${length}×${height} ft (${wallType}" thick)\n🧱 Bricks: ${formatNumber(results.bricks)}\n📦 Cement: ${formatNumber(results.cement)} bags\n🏖️ Sand: ${formatNumber(results.sand)} tons\n\nPlease share a quote.`
    : '';

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1A2B47] mb-1">Brick Work Calculator</h2>
      <p className="text-sm text-[rgba(26,43,71,0.5)] mb-6">
        Estimate number of bricks, cement & sand for building walls.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <InputField
          label="Total Wall Length"
          value={length} onChange={setLength} unit="ft" placeholder="e.g. 25"
          helpText="Add up all wall lengths. Example: room 10×10 ft = 40 ft perimeter"
        />
        <InputField
          label="Wall Height"
          value={height} onChange={setHeight} unit="ft" placeholder="e.g. 10"
          helpText="From foundation to roof. Typical: 10 ft per floor"
        />
        <SelectField
          label="Wall Thickness"
          value={wallType} onChange={setWallType} options={WALL_OPTIONS}
          helpText="9 inch for outer & main walls. 4.5 inch for room partitions"
        />
        <SelectField
          label="Mortar Mix Ratio"
          value={mortar} onChange={setMortar} options={MORTAR_OPTIONS}
          helpText="Cement : Sand ratio for binding bricks. 1:6 is common for general walls"
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
          <p className="text-sm font-medium text-[#1A2B47] mb-3">Wall Area: {formatNumber(results.area)} sq ft ({wallType}" thick)</p>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Bricks" value={formatNumber(results.bricks)} unit="nos" highlight />
            <ResultCard label="Cement" value={formatNumber(results.cement)} unit="bags" />
            <ResultCard label="Sand" value={formatNumber(results.sand)} unit="tons" />
          </div>
          <WhatsAppQuoteButton message={whatsappMsg} />
        </div>
      )}
    </div>
  );
}
