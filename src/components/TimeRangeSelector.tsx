import React from 'react';
import { Clock } from 'lucide-react';

interface TimeRangeSelectorProps {
  selected: string;
  onChange: (range: string) => void;
}

const ranges = [
  { value: '1h', label: 'Last Hour' },
  { value: '24h', label: '24 Hours' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: 'custom', label: 'Custom' }
];

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ 
  selected, 
  onChange 
}) => {
  return (
    <div className="bg-[#2d3142] rounded-xl p-4 shadow-lg border border-gray-700/50 flex items-center gap-4">
      <Clock className="text-[#00d9ff]" size={20} />
      <div className="flex gap-2 flex-wrap">
        {ranges.map(range => (
          <button
            key={range.value}
            onClick={() => onChange(range.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selected === range.value
                ? 'bg-[#00d9ff] text-white shadow-lg shadow-[#00d9ff]/20'
                : 'bg-[#1a1d29] text-gray-400 hover:text-white hover:bg-[#252837]'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};
