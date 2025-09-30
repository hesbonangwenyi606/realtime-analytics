import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface HeatMapDataPoint {
  hour: number;
  day: string;
  value: number;
}

interface HeatMapProps {
  data: HeatMapDataPoint[];
  title: string;
}

export const HeatMap: React.FC<HeatMapProps> = ({ data, title }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 40, right: 30, bottom: 40, left: 60 };
    const width = 700 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const x = d3.scaleBand()
      .domain(hours.map(String))
      .range([0, width])
      .padding(0.05);

    const y = d3.scaleBand()
      .domain(days)
      .range([0, height])
      .padding(0.05);

    const colorScale = d3.scaleSequential()
      .domain([0, d3.max(data, d => d.value) as number])
      .interpolator(d3.interpolateBlues);

    // Cells
    g.selectAll('.cell')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('x', d => x(String(d.hour)) as number)
      .attr('y', d => y(d.day) as number)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', d => colorScale(d.value))
      .attr('rx', 2)
      .style('opacity', 0)
      .transition()
      .duration(800)
      .style('opacity', 1);

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickValues(hours.filter(h => h % 3 === 0).map(String)))
      .attr('color', '#6b7280');

    g.append('g')
      .call(d3.axisLeft(y))
      .attr('color', '#6b7280');

  }, [data]);

  return (
    <div className="bg-[#2d3142] rounded-xl p-6 shadow-lg border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <svg ref={svgRef} width="700" height="300" className="w-full" />
    </div>
  );
};
