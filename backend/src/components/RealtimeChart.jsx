import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function RealtimeChart() {
  const chartRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const point = JSON.parse(event.data);
      setData((prev) => {
        const newData = [...prev, point.usersCount];
        return newData.length > 20 ? newData.slice(-20) : newData; // last 20 points
      });
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const width = 500;
    const height = 200;

    svg.attr("width", width).attr("height", height);

    const x = d3.scaleLinear().domain([0, 19]).range([0, width]);
    const y = d3.scaleLinear().domain([0, d3.max(data) || 10]).range([height, 0]);

    const line = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [data]);

  return <svg ref={chartRef}></svg>;
}
