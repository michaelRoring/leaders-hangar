"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface RevenueExpenseCardProps {
  type: "revenue" | "expense";
  number: number;
  monthlyRate: number;
}

export default function RevenueExpenseCard({
  type,
  number,
  monthlyRate,
}: RevenueExpenseCardProps) {
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const chartConfig = {
    desktop: {
      label: type,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <>
      <Card className="min-h-40 bg-slate-100 w-full md:col-span-4">
        <CardHeader>
          <CardTitle>{type === "revenue" ? "Revenue" : "Expense"}</CardTitle>
          <CardDescription>Current {type}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} horizontal={false} />
              {/* <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              /> */}
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="desktop"
                type="natural"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
          <div className="relative">
            <p className="absolute right-0 bottom-0  text-xl font-bold">
              {monthlyRate} % <a className="font-thin text-sm">monthly rate</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
