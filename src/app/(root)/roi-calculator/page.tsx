"use client";
import { useState, useEffect, ChangeEvent } from "react";
// import TooltipButton from "./TooltipButton";
// import RoiChart from "./RoiChart";

import TooltipButton from "@/components/TooltipButton";
import RoiChart from "@/components/ROIChart";

const RoiCalculator: React.FC = () => {
  // State for form inputs
  const [campaignSpend, setCampaignSpend] = useState<string>("");
  const [cac, setCac] = useState<string>("");
  const [cltv, setCltv] = useState<string>("");
  const [conversionRate, setConversionRate] = useState<string>("");

  // State for calculated results
  const [totalRevenue, setTotalRevenue] = useState<number>(135239);
  const [totalProfit, setTotalProfit] = useState<number>(2519);
  const [roi, setRoi] = useState<number>(12);
  const [breakEvenPoint, setBreakEvenPoint] = useState<string>("dec '25");
  const [chartData, setChartData] = useState<number[]>([
    0, 0, 0, 0, 5, 10, 20, 40, 70, 90, 95, 90,
  ]);

  // Calculate results when inputs change
  useEffect(() => {
    if (campaignSpend && cac && cltv && conversionRate) {
      const spend = parseFloat(campaignSpend);
      const customerAcquisitionCost = parseFloat(cac);
      const customerLifetimeValue = parseFloat(cltv);
      const conversion = parseFloat(conversionRate) / 100;

      // Simple calculation example
      const customers = (spend / customerAcquisitionCost) * conversion;
      const revenue = customers * customerLifetimeValue;
      const profit = revenue - spend;
      const calculatedRoi = spend > 0 ? (profit / spend) * 100 : 0;

      setTotalRevenue(revenue);
      setTotalProfit(profit);
      setRoi(calculatedRoi);

      // Calculate break-even point
      const date = new Date();
      date.setMonth(date.getMonth() + Math.ceil(spend / (profit / 12)));
      setBreakEvenPoint(
        `${date
          .toLocaleString("default", { month: "short" })
          .toLowerCase()} '${date.getFullYear().toString().substring(2)}`
      );

      // Generate chart data based on inputs
      // This is a simplified S-curve growth model
      const newChartData = Array(12)
        .fill(0)
        .map((_, i) => {
          if (i < 3) return i * 2; // Slow start
          if (i < 7) return 6 + (i - 3) * 15; // Rapid growth
          return 66 + Math.min(30, (11 - i) * 8); // Plateau
        });

      setChartData(newChartData);
    }
  }, [campaignSpend, cac, cltv, conversionRate]);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^\d.]/g, "");
      setter(value);
    };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8 rounded-t-xl">
        <h1 className="text-4xl font-bold mb-2 text-white">
          ROI Marketing Calculator
        </h1>

        <p className="text-sm text-white mb-6">
          Your runway is calculated based on your current cash balance,
          projected revenue, and projected expenses. It represents the estimated
          time until your cash reserves are depleted.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* Left column - Form inputs */}
        <div className="col-span-12 md:col-span-5 space-y-4">
          <div>
            <label className="block font-medium mb-1">
              Total campaign spend
            </label>
            <div className="flex items-center">
              <span className="mr-1">$</span>
              <input
                type="text"
                value={campaignSpend}
                onChange={handleInputChange(setCampaignSpend)}
                className="w-full border rounded p-2"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Customer Acquisition Cost (CAC)
            </label>
            <div className="flex items-center">
              <span className="mr-1">$</span>
              <input
                type="text"
                value={cac}
                onChange={handleInputChange(setCac)}
                className="w-full border rounded p-2"
                placeholder="0"
              />
              <TooltipButton tooltip="Average cost to acquire a new customer" />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Customer Lifetime Value (CLTV)
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={cltv}
                onChange={handleInputChange(setCltv)}
                className="w-full border rounded p-2"
                placeholder="0"
              />
              <TooltipButton tooltip="Average revenue a customer generates during their relationship with your business" />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Conversion rate (%)
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={conversionRate}
                onChange={handleInputChange(setConversionRate)}
                className="w-full border rounded p-2"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Right column - Results */}
        <div className="col-span-12 md:col-span-7">
          <div className="relative bg-green-50 p-4 rounded-lg mb-4 h-56">
            {/* ROI Display */}
            <div className="absolute left-4 top-4 right-4">
              <div className="font-medium text-base">
                Projected ROI over
                <br />
                12 months
              </div>
              <div className="text-4xl font-bold mt-1">{roi.toFixed(0)}%</div>
            </div>

            {/* Total Revenue Box */}
            <div className="absolute right-4 top-4 w-36 bg-white rounded-md p-2 shadow-sm">
              <div className="text-xs text-gray-600">Total revenue</div>
              <div className="text-xl font-bold">
                ${" "}
                {totalRevenue.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>

            {/* Total Profit Box */}
            <div className="absolute right-4 top-20 w-36 bg-white rounded-md p-2 shadow-sm">
              <div className="text-xs text-gray-600">Total profit</div>
              <div className="text-xl font-bold">
                ${" "}
                {totalProfit.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>

            {/* Break-even Point Box */}
            <div className="absolute right-4 top-36 w-36 bg-white rounded-md p-2 shadow-sm">
              <div className="text-xs text-gray-600">Break-even point</div>
              <div className="text-xl font-bold">{breakEvenPoint}</div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-48 border rounded overflow-hidden bg-white">
            <RoiChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoiCalculator;
