import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DonutDataPoint {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutDataPoint[];
  title: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 20;

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<DonutDataPoint>()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc<d3.PieArcDatum<DonutDataPoint>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    const arcs = g.selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .attr('stroke', '#1a1d29')
      .attr('stroke-width', 2)
      .style('opacity', 0)
      .transition()
      .duration(800)
      .style('opacity', 1);

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 120}, 20)`);

    data.forEach((d, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 25})`);

      legendRow.append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', d.color)
        .attr('rx', 2);

      legendRow.append('text')
        .attr('x', 20)
        .attr('y', 10)
        .attr('fill', '#9ca3af')
        .style('font-size', '12px')
        .text(`${d.label} (${d.value}%)`);
    });

  }, [data]);

  return (
    <div className="bg-[#2d3142] rounded-xl p-6 shadow-lg border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <svg ref={svgRef} width="400" height="300" className="w-full" />
    </div>
  );
};
