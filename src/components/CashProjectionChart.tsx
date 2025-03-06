// /components/CashProjectionChart.tsx
import React from "react";
import { RunwayCalculatorData } from "@/types";

interface CashProjectionChartProps {
  data: RunwayCalculatorData;
}

export default function CashProjectionChart({
  data,
}: CashProjectionChartProps) {
  // This would be a more complex chart showing cash over time
  return (
    <div className="w-full h-60 border rounded-md bg-white">
      <svg width="100%" height="100%" viewBox="0 0 600 240">
        {/* Axes */}
        <line
          x1="40"
          y1="200"
          x2="580"
          y2="200"
          stroke="#ccc"
          strokeWidth="1"
        />
        <line x1="40" y1="20" x2="40" y2="200" stroke="#ccc" strokeWidth="1" />

        {/* Cash projection curve */}
        <path
          d="M40,180 C70,170 100,120 130,70 C160,30 190,20 220,40 C250,60 280,80 310,100 C340,120 370,140 400,160 C430,180 460,190 490,195 C520,200 550,205 580,210"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
        />

        {/* Axis labels */}
        <text x="40" y="220" fontSize="12" textAnchor="middle">
          0
        </text>
        <text x="580" y="220" fontSize="12" textAnchor="middle">
          Time
        </text>
        <text x="20" y="20" fontSize="12" textAnchor="middle">
          $
        </text>
      </svg>
    </div>
  );
}
