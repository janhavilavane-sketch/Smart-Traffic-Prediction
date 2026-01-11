
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TrafficMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`);

    svg.selectAll("*").remove();

    // Create a simple grid-like city map
    const nodes = [
      { id: 'Downtown', x: 300, y: 200, traffic: 'high' },
      { id: 'North End', x: 300, y: 50, traffic: 'medium' },
      { id: 'South Side', x: 300, y: 350, traffic: 'low' },
      { id: 'West Gate', x: 50, y: 200, traffic: 'medium' },
      { id: 'East Port', x: 550, y: 200, traffic: 'low' },
      { id: 'University', x: 150, y: 100, traffic: 'high' },
      { id: 'Hospital', x: 450, y: 100, traffic: 'low' },
      { id: 'Tech Park', x: 450, y: 300, traffic: 'medium' },
    ];

    const links = [
      { source: 'West Gate', target: 'University' },
      { source: 'University', target: 'North End' },
      { source: 'North End', target: 'Hospital' },
      { source: 'Hospital', target: 'East Port' },
      { source: 'West Gate', target: 'Downtown' },
      { source: 'Downtown', target: 'East Port' },
      { source: 'University', target: 'Downtown' },
      { source: 'Downtown', target: 'South Side' },
      { source: 'Hospital', target: 'Downtown' },
      { source: 'South Side', target: 'Tech Park' },
      { source: 'Tech Park', target: 'East Port' },
    ];

    const getTrafficColor = (level: string) => {
      switch (level) {
        case 'high': return '#ef4444';
        case 'medium': return '#f59e0b';
        case 'low': return '#10b981';
        default: return '#94a3b8';
      }
    };

    // Draw lines
    svg.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('x1', d => nodes.find(n => n.id === d.source)!.x)
      .attr('y1', d => nodes.find(n => n.id === d.source)!.y)
      .attr('x2', d => nodes.find(n => n.id === d.target)!.x)
      .attr('y2', d => nodes.find(n => n.id === d.target)!.y)
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 4)
      .attr('stroke-linecap', 'round');

    // Flow animation
    links.forEach((link, i) => {
      const source = nodes.find(n => n.id === link.source)!;
      const target = nodes.find(n => n.id === link.target)!;
      
      const circle = svg.append('circle')
        .attr('r', 3)
        .attr('fill', getTrafficColor(source.traffic))
        .attr('cx', source.x)
        .attr('cy', source.y);

      const repeat = () => {
        circle
          .attr('cx', source.x)
          .attr('cy', source.y)
          .transition()
          .duration(2000 + Math.random() * 3000)
          .ease(d3.easeLinear)
          .attr('cx', target.x)
          .attr('cy', target.y)
          .on('end', repeat);
      };
      repeat();
    });

    // Draw nodes
    const nodeGroups = svg.selectAll('g.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    nodeGroups.append('circle')
      .attr('r', 8)
      .attr('fill', d => getTrafficColor(d.traffic))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    nodeGroups.append('text')
      .text(d => d.id)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-weight', '500')
      .attr('fill', '#475569');

  }, []);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur p-2 rounded-lg border border-slate-100 text-[10px] space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" /> High Congestion
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" /> Medium
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" /> Low Flow
        </div>
      </div>
      <svg ref={svgRef} className="w-full h-full min-h-[300px]" />
    </div>
  );
};

export default TrafficMap;
