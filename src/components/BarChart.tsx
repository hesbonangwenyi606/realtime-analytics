import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BarDataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarDataPoint[];
  title: string;
  color?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  title,
  color = '#7c3aed'
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, width])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .nice()
      .range([height, 0]);

    // Bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label) as number)
      .attr('y', height)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', color)
      .attr('rx', 4)
      .transition()
      .duration(800)
      .attr('y', d => y(d.value))
      .attr('height', d => height - y(d.value));

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .attr('color', '#6b7280')
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    g.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .attr('color', '#6b7280');

  }, [data, color]);

  return (
    <div className="bg-[#2d3142] rounded-xl p-6 shadow-lg border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <svg ref={svgRef} width="500" height="300" className="w-full" />
    </div>
  );
};
