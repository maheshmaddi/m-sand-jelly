import { useState } from 'react';
import ConcreteCalculator from './calculators/ConcreteCalculator';
import PlasteringCalculator from './calculators/PlasteringCalculator';
import BrickWorkCalculator from './calculators/BrickWorkCalculator';
import AreaVolumeCalculator from './calculators/AreaVolumeCalculator';
import CostEstimator from './calculators/CostEstimator';

const tabs = [
  { id: 'concrete', label: 'Concrete Mix', icon: '🧱' },
  { id: 'plastering', label: 'Plastering', icon: '🧱' },
  { id: 'brickwork', label: 'Brick Work', icon: '🏗️' },
  { id: 'area', label: 'Area & Volume', icon: '📐' },
  { id: 'cost', label: 'Cost Estimator', icon: '💰' },
];

export default function Calculators() {
  const [activeTab, setActiveTab] = useState('concrete');

  return (
    <div className="min-h-screen bg-[#F9F7F0] pt-20 pb-16 px-4">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-[#C23B22] text-xs font-semibold uppercase tracking-[0.15em]">
            CONSTRUCTION TOOLS
          </span>
          <h1 className="text-[#1A2B47] font-semibold mt-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
            Material Calculators
          </h1>
          <p className="text-[rgba(26,43,71,0.6)] mt-2 text-sm">
            Estimate quantities and costs for your construction project
          </p>
        </div>

        {/* Tab Navigation - Horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide -mx-1 px-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#C23B22] text-white shadow-md'
                  : 'bg-white text-[#1A2B47] hover:bg-[#1A2B47] hover:text-white shadow-sm'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Calculator Content */}
        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8">
          {activeTab === 'concrete' && <ConcreteCalculator />}
          {activeTab === 'plastering' && <PlasteringCalculator />}
          {activeTab === 'brickwork' && <BrickWorkCalculator />}
          {activeTab === 'area' && <AreaVolumeCalculator />}
          {activeTab === 'cost' && <CostEstimator />}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-[rgba(26,43,71,0.6)] text-sm mb-3">Ready to order?</p>
          <a
            href="tel:9964666749"
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#C23B22] text-[#1A2B47] hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            📞 Call Now: 9964666749
          </a>
        </div>
      </div>
    </div>
  );
}
