"use client";
import { useState } from "react";

interface TooltipButtonProps {
  tooltip: string;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({ tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative ml-2">
      <button
        type="button"
        className="px-3 py-1 bg-gray-200 rounded text-sm font-medium"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        How to count?
      </button>

      {showTooltip && (
        <div className="absolute z-10 w-64 p-3 bg-black text-white rounded shadow-lg -top-2 right-full transform -translate-y-full -mr-2">
          <p className="text-sm">{tooltip}</p>
          <div className="absolute -mr-1 top-1/2 right-0 transform translate-x-1/2 rotate-45 w-2 h-2 bg-black"></div>
        </div>
      )}
    </div>
  );
};

export default TooltipButton;
