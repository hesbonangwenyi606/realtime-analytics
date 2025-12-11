import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function ActivePieChart() {
  const svgRef = useRef();
  const [data, setData] = useState([60, 40]); // Example: 60 active, 40 inactive

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const pie = d3.pie()(data);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const color = d3.scaleOrdinal(["green", "red"]);

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    g.selectAll("path")
      .data(pie)
      .join("path")
      .attr("d", arc)
      .attr("fill", (_, i) => color(i));
  }, [data]);

  return <svg ref={svgRef}></svg>;
}
