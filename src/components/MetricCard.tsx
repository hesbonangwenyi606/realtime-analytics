import React, { useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: number;
  change: number;
  trend: number[];
  format?: 'number' | 'currency' | 'percent';
  isLive?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  trend,
  format = 'number',
  isLive = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min || 1;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = change >= 0 ? '#00d9ff' : '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();

    trend.forEach((val, i) => {
      const x = (i / (trend.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
  }, [trend, change]);

  const formatValue = (val: number) => {
    if (format === 'currency') return `$${val.toLocaleString()}`;
    if (format === 'percent') return `${val.toFixed(1)}%`;
    return val.toLocaleString();
  };

  const isPositive = change >= 0;

  return (
    <div className="bg-[#2d3142] rounded-xl p-6 shadow-lg border border-gray-700/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm font-medium">{label}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-bold text-white font-mono">
              {formatValue(value)}
            </h3>
            {isLive && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-green-500">Live</span>
              </span>
            )}
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
          isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="text-sm font-semibold">{Math.abs(change).toFixed(1)}%</span>
        </div>
      </div>
      <canvas ref={canvasRef} width={280} height={60} className="w-full" />
    </div>
  );
};
