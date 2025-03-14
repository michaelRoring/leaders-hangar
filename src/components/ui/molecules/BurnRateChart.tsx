// /components/BurnRateChart.tsx
import React from "react";

interface BurnRateChartProps {
  burnRate: number;
}

export default function BurnRateChart({ burnRate }: BurnRateChartProps) {
  // This would be a simple SVG line chart
  return (
    <svg width="100%" height="40" viewBox="0 0 100 40">
      <path
        d="M0,35 C10,30 20,25 30,20 C40,15 50,12 60,15 C70,18 80,25 90,20 C100,15 110,10 120,5"
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
      />
    </svg>
  );
}
