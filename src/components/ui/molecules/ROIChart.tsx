"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface RoiChartProps {
  data: number[];
}

const RoiChart: React.FC<RoiChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // If a chart instance exists, destroy it before creating a new one
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: "ROI Growth",
                data: data,
                borderColor: "#ef4444",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                tension: 0.4,
                fill: false,
                pointRadius: 0,
                borderWidth: 3,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            scales: {
              x: {
                display: true,
                grid: {
                  display: true,
                  color: "#e5e7eb",
                  //   drawBorder: true,
                },
                ticks: {
                  display: true,
                  font: {
                    size: 10,
                    family: "'Inter', sans-serif",
                  },
                  color: "#9ca3af",
                  maxRotation: 0,
                  autoSkip: true,
                  maxTicksLimit: 6,
                },
                border: {
                  display: true,
                  color: "#d1d5db",
                  width: 1,
                },
              },
              y: {
                display: true,
                position: "left",
                grid: {
                  display: true,
                  color: "#e5e7eb",
                  //   drawBorder: true,
                },
                ticks: {
                  display: true,
                  font: {
                    size: 10,
                    family: "'Inter', sans-serif",
                  },
                  color: "#9ca3af",
                  maxTicksLimit: 5,
                  callback: function (value) {
                    return value + "%";
                  },
                },
                border: {
                  display: true,
                  color: "#d1d5db",
                  width: 1,
                },
                beginAtZero: true,
                suggestedMax: 100,
              },
            },
            elements: {
              line: {
                tension: 0.4,
              },
            },
            layout: {
              padding: {
                left: 5,
                right: 10,
                top: 10,
                bottom: 5,
              },
            },
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
            },
          },
        });
      }
    }

    // Cleanup chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="w-full h-full relative">
      {/* Horizontal gray reference line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 z-0"></div>

      {/* Canvas for chart */}
      <canvas ref={chartRef} className="z-10 relative" />
    </div>
  );
};

export default RoiChart;
