import { useState } from 'react';
import { formatNumber, InputField, ResultCard, SelectField } from './shared';

const WALL_OPTIONS = [
  { value: '4.5', label: '4.5 inch (Single brick)' },
  { value: '9', label: '9 inch (Double brick)' },
];

const MORTAR_OPTIONS = [
  { value: '1:4', label: '1:4 (Rich)' },
  { value: '1:5', label: '1:5 (Standard)' },
  { value: '1:6', label: '1:6 (Economy)' },
];

export default function BrickWorkCalculator() {
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [wallType, setWallType] = useState('9');
  const [mortar, setMortar] = useState('1:6');
  const [results, setResults] = useState<null | {
    bricks: number;
    cement: number;
    sand: number;
    area: number;
  }>(null);

  const calculate = () => {
    const l = parseFloat(length) || 0;
    const h = parseFloat(height) || 0;
    const thick = parseFloat(wallType);
    if (!l || !h) return;

    const areaSqft = l * h;
    const areaSqm = areaSqft * 0.0929;
    const volM3 = areaSqm * (thick * 0.0254); // inch to m

    // Standard brick with mortar: 20cm × 10cm × 10cm = 0.002 m³
    const brickVol = 0.002;
    const bricks = Math.ceil(volM3 / brickVol);

    // Mortar ≈ 25% of brickwork volume
    const mortarVol = volM3 * 0.25;
    const dryMortarVol = mortarVol * 1.33;

    const [c, s] = mortar.split(':').map(Number);
    const totalParts = c + s;

    const cementVol = (dryMortarVol * c) / totalParts;
    const cementBags = cementVol / 0.035;

    const sandVol = (dryMortarVol * s) / totalParts;
    const sandTons = sandVol * 1.6;

    setResults({ bricks, cement: cementBags, sand: sandTons, area: areaSqft });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1A2B47] mb-1">Brick Work Calculator</h2>
      <p className="text-sm text-[rgba(26,43,71,0.5)] mb-6">Estimate bricks, cement & sand for wall construction</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <InputField label="Wall Length" value={length} onChange={setLength} unit="ft" placeholder="e.g. 25" />
        <InputField label="Wall Height" value={height} onChange={setHeight} unit="ft" placeholder="e.g. 10" />
        <SelectField label="Wall Thickness" value={wallType} onChange={setWallType} options={WALL_OPTIONS} />
        <SelectField label="Mortar Ratio" value={mortar} onChange={setMortar} options={MORTAR_OPTIONS} />
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
        </div>
      )}
    </div>
  );
}
