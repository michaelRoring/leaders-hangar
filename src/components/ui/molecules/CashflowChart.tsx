// components/dashboard/CashFlowChart.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

interface CashFlowChartProps {
  projections: any;
}

export default function CashFlowChart({ projections }: CashFlowChartProps) {
  const labels = projections.timeline;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Conservative",
        data: projections.cashFlow.conservative,
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
      },
      {
        label: "Base Case",
        data: projections.cashFlow.baseCase,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
      {
        label: "Optimistic",
        data: projections.cashFlow.optimistic,
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: function (value: any) {
            return new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
              compactDisplay: "short",
            }).format(value);
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500">
        <CardTitle className="text-white flex justify-between items-center">
          <span>Cash Flow Projection (Multiple Scenarios)</span>
          <Tabs defaultValue="chart">
            <TabsList className="bg-white/20">
              <TabsTrigger
                value="chart"
                className="data-[state=active]:bg-white/30"
              >
                Chart
              </TabsTrigger>
              <TabsTrigger
                value="table"
                className="data-[state=active]:bg-white/30"
              >
                Table
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px]">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
