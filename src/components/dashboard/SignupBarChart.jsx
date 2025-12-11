import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function SignupBarChart() {
  const svgRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const point = JSON.parse(event.data);
      // Example: use usersCount as signup data
      setData((prev) => {
        const newData = [...prev, point.usersCount];
        return newData.length > 10 ? newData.slice(-10) : newData;
      });
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 200;

    svg.attr("width", width).attr("height", height);

    const x = d3
      .scaleBand()
      .domain(data.map((_, i) => i))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 10])
      .range([height, 0]);

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (_, i) => x(i))
      .attr("y", (d) => y(d))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d))
      .attr("fill", "orange");
  }, [data]);

  return <svg ref={svgRef}></svg>;
}
