import { useState } from 'react';
import { formatNumber, InputField, ResultCard } from './shared';

export default function AreaVolumeCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [results, setResults] = useState<null | {
    areaSqft: number;
    areaSqm: number;
    volCft: number;
    volCum: number;
  }>(null);

  const calculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = parseFloat(depth) || 0;
    if (!l || !w) return;

    const areaSqft = l * w;
    const areaSqm = areaSqft * 0.0929;

    let volCft = 0;
    let volCum = 0;
    if (d) {
      volCft = l * w * d;
      volCum = volCft * 0.0283;
    }

    setResults({ areaSqft, areaSqm, volCft, volCum });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1A2B47] mb-1">Area & Volume Calculator</h2>
      <p className="text-sm text-[rgba(26,43,71,0.5)] mb-6">Quick area and volume calculations with unit conversion</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <InputField label="Length" value={length} onChange={setLength} unit="ft" placeholder="e.g. 40" />
        <InputField label="Width" value={width} onChange={setWidth} unit="ft" placeholder="e.g. 30" />
        <InputField label="Depth (optional)" value={depth} onChange={setDepth} unit="ft" placeholder="e.g. 0.5" step="0.1" />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-[#C23B22] hover:bg-[#1A2B47] text-white py-3 rounded-lg font-semibold transition-colors duration-200"
      >
        Calculate
      </button>

      {results && (
        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs font-medium text-[rgba(26,43,71,0.5)] uppercase tracking-wide mb-2">Area</p>
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Square Feet" value={formatNumber(results.areaSqft)} unit="sq ft" highlight />
              <ResultCard label="Square Meters" value={formatNumber(results.areaSqm)} unit="sq m" />
            </div>
          </div>
          {results.volCft > 0 && (
            <div>
              <p className="text-xs font-medium text-[rgba(26,43,71,0.5)] uppercase tracking-wide mb-2">Volume</p>
              <div className="grid grid-cols-2 gap-3">
                <ResultCard label="Cubic Feet" value={formatNumber(results.volCft)} unit="cft" highlight />
                <ResultCard label="Cubic Meters" value={formatNumber(results.volCum)} unit="cum" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
