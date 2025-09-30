import React, { useState, useEffect } from 'react';
import { TopNavigation } from './TopNavigation';
import { MetricCard } from './MetricCard';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';
import { DonutChart } from './DonutChart';
import { HeatMap } from './HeatMap';
import { DataTable } from './DataTable';
import { TimeRangeSelector } from './TimeRangeSelector';
import { wsService, MetricData } from '../services/WebSocketService';

const userAvatar = 'https://d64gsuwffb70l.cloudfront.net/68dc30e7b3bddcd8a976eb1b_1759260947099_4e5487c2.webp';

export default function AppLayout() {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [timeRange, setTimeRange] = useState('24h');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    wsService.connect();
    setIsConnected(true);

    const handleMetrics = (data: MetricData[]) => {
      setMetrics(data);
    };

    wsService.subscribe('metrics', handleMetrics);

    return () => {
      wsService.unsubscribe('metrics', handleMetrics);
      wsService.disconnect();
    };
  }, []);

  // Generate chart data
  const lineChartData = Array.from({ length: 24 }, (_, i) => ({
    timestamp: Date.now() - (23 - i) * 3600000,
    value: Math.floor(10000 + Math.random() * 5000)
  }));

  const barChartData = [
    { label: 'Mon', value: 4200 },
    { label: 'Tue', value: 5800 },
    { label: 'Wed', value: 6100 },
    { label: 'Thu', value: 5400 },
    { label: 'Fri', value: 7200 },
    { label: 'Sat', value: 3900 },
    { label: 'Sun', value: 4500 }
  ];

  const donutChartData = [
    { label: 'Desktop', value: 45, color: '#00d9ff' },
    { label: 'Mobile', value: 35, color: '#7c3aed' },
    { label: 'Tablet', value: 20, color: '#f59e0b' }
  ];

  const heatMapData = Array.from({ length: 168 }, (_, i) => ({
    hour: i % 24,
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][Math.floor(i / 24)],
    value: Math.floor(Math.random() * 100)
  }));

  const tableData = Array.from({ length: 50 }, (_, i) => ({
    id: `evt-${i}`,
    timestamp: new Date(Date.now() - i * 600000).toLocaleString(),
    event: ['Purchase', 'Signup', 'Login', 'View'][Math.floor(Math.random() * 4)],
    user: `user${Math.floor(Math.random() * 1000)}`,
    value: Math.floor(Math.random() * 500),
    status: (['success', 'pending', 'failed'] as const)[Math.floor(Math.random() * 3)]
  }));

  return (
    <div className="min-h-screen bg-[#1a1d29]">
      <TopNavigation isConnected={isConnected} userName="Admin User" userAvatar={userAvatar} />
      
      <div className="p-6 space-y-6">
        <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map(metric => (
            <MetricCard
              key={metric.id}
              label={metric.label}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              format={metric.id === 'revenue' ? 'currency' : metric.id === 'bounce' ? 'percent' : 'number'}
              isLive={true}
            />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart data={lineChartData} title="User Activity (24h)" />
          <BarChart data={barChartData} title="Weekly Performance" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DonutChart data={donutChartData} title="Traffic by Device" />
          <HeatMap data={heatMapData} title="Activity Heatmap" />
        </div>

        {/* Data Table */}
        <DataTable data={tableData} title="Recent Events" />
      </div>
    </div>
  );
}
