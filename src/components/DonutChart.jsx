import React, { useCallback } from 'react';

// Colors assigned to each slice of the donut chart
const COLORS = ['#4e79a7', '#6699cc', '#80b1d3', '#99c2eb', '#b3d3f4', '#cce5ff'];

const DonutChart = ({ items, style }) => {
  // Total value of all slices to calculate percentage angles
  const total = items.reduce((acc, item) => acc + parseInt(item?.value, 10), 0);

  const radius = 60;        // Radius of the donut circle
  const strokeWidth = 40;   // Thickness of each arc segment
  let cumulative = 0;       // Accumulator for current arc start point

  // Convert polar coordinates to cartesian (needed for SVG arc math)
  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = (angle * Math.PI) / 180; // Convert degrees to radians
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  // Return an SVG arc path string from startAngle to endAngle
  const describeArc = useCallback((x, y, radius, startAngle, endAngle) => {
    //convert angle plus radius to actual x,y coordinates
    const end = polarToCartesian(x, y, radius, startAngle);
    const start = polarToCartesian(x, y, radius, endAngle);
    //SVG arcs can take either the shorter path or longer path between two points
    //This flag tells SVG whether to take the larger of the two arcs (1 = yes, 0 = no).
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    /*
    M = move to starting point

    A = draw an arc:

    First two args: rx ry = radius in x and y

    0 = x-axis rotation (none)

    largeArcFlag = long vs short arc

    0 = sweep flag (direction of drawing, clockwise here)

    end.x end.y = destination point
    */
    return [
      'M', start.x, start.y,                    // Move to arc start point
      'A', radius, radius, 0, largeArcFlag, 0,  // Arc parameters
      end.x, end.y                              // Draw to end point
    ].join(' ');
  },[items,items.length]);

  // Generate all arcs and labels for each item
  const arcs = items.map((slice, index) => {
    const startAngle = (cumulative / total) * 360;

    // Adjust the last angle to fill in the gap
    const angle = (index === items.length - 1)
      ? 360 - startAngle  // Use the remaining angle
      : (slice.value / total) * 360;

    const endAngle = startAngle + angle;

    cumulative += slice.value; // Update cumulative for next slice

    // Generate arc path string for SVG <path> element
    const path = describeArc(100, 100, radius, startAngle, endAngle);

    // Calculate label position outside the arc's midpoint
    const midAngle = startAngle + angle / 2;
    const arcMidpoint = polarToCartesian(100, 100, radius, midAngle)
    const labelPos = polarToCartesian(100, 100, radius + 45, midAngle);

    return (
      <g key={index}>
        {/* Draw the arc */}
        <path
          d={path}
          stroke={COLORS[index]}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Connector line from arc midpoint to pin */}
        <line
          x1={arcMidpoint.x||0}
          y1={arcMidpoint.y||0}
          x2={labelPos.x||0}
          y2={labelPos.y||0}
          stroke={COLORS[index]}
          strokeWidth={2}
        />

        {/* Thumb pin */}
        <circle
          cx={labelPos.x||0}
          cy={labelPos.y||0}
          r={14}
          fill={COLORS[index]}
          // stroke="white"
          strokeWidth={2}
        />

        {/* Label above the pin */}
        <text
          x={labelPos.x||0}
          y={labelPos.y||0}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          
        >
          {slice?.activity?.charAt(0)}
        </text>

      </g>


    );
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='mt-6'>
      {/* Render the SVG donut chart */}
      <svg width="200" height="200" viewBox="0 0 200 200" overflow="visible">
        {arcs}
      </svg>

      {/* Render the legend list beside the chart */}
      <ul style={{ listStyle: 'none', padding: 0, margin: "0 0 0 6px" }}>
        {items.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '8px', ...style.p }}>
            <strong>{item?.activity?.charAt(0)}</strong>: {item.activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonutChart;
