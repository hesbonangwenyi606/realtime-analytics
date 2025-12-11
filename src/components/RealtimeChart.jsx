import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function RealtimeChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const width = 600;
    const height = 300;

    // Create SVG
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const linePath = svg
      .append("path")
      .attr("stroke", "steelblue")
      .attr("fill", "none")
      .attr("stroke-width", 2);

    let data = [];

    // WebSocket connection
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const point = JSON.parse(event.data);
      data.push(point);
      if (data.length > 50) data.shift();

      // Create scales
      const x = d3.scaleLinear().domain([0, 49]).range([0, width]);
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .range([height, 0]);

      // Line generator
      const line = d3
        .line()
        .x((d, i) => x(i))
        .y((d) => y(d.value));

      linePath.attr("d", line(data));
    };

    return () => ws.close();
  }, []);

  return <div ref={chartRef}></div>;
}
