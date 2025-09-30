import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  timestamp: number;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  title: string;
  color?: string;
}

export const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  title,
  color = '#00d9ff'
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.timestamp) as [number, number])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .nice()
      .range([height, 0]);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(y).tickSize(-width).tickFormat(() => ''));

    // Area
    const area = d3.area<DataPoint>()
      .x(d => x(d.timestamp))
      .y0(height)
      .y1(d => y(d.value))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', color)
      .attr('fill-opacity', 0.2)
      .attr('d', area);

    // Line
    const line = d3.line<DataPoint>()
      .x(d => x(d.timestamp))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', line);

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(6))
      .attr('color', '#6b7280');

    g.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .attr('color', '#6b7280');

  }, [data, color]);

  return (
    <div className="bg-[#2d3142] rounded-xl p-6 shadow-lg border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <svg ref={svgRef} width="600" height="300" className="w-full" />
    </div>
  );
};
