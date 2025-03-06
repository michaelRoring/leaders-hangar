"use client";
// /components/RunwayCalculator.tsx
import { useState, useEffect } from "react";
import { RunwayCalculatorData } from "@/types";

import SliderInput from "@/components/SliderInput";
import DateInput from "@/components/DateInput";
import BurnRateChart from "@/components/BurnRateChart";
import CashProjectionChart from "@/components/CashProjectionChart";
import WarningCard from "@/components/WarningCard";
import { calculateRunway, calculateLowCashWarning } from "@/utils/calculations";

export default function RunwayCalculator() {
  const [data, setData] = useState<RunwayCalculatorData>({
    currentCash: 50000,
    burnRate: 7300,
    revenueGrowthRate: 0.5,
    expenseGrowthRate: 0.5,
    fundInjection: {
      amount: 0,
      date: new Date("2024/09/02"),
    },
    lowCashWarningDate: new Date("2026/01/01"),
    projectedRunwayDate: new Date("2026/04/01"),
  });

  const resetNumber = () => {
    setData({
      ...data,
      currentCash: 50000,
      burnRate: 7300,
    });
  };

  useEffect(() => {
    // Recalculate runway dates whenever inputs change
    const runwayDate = calculateRunway(data);
    const warningDate = calculateLowCashWarning(data);

    setData((prev) => ({
      ...prev,
      lowCashWarningDate: warningDate,
      projectedRunwayDate: runwayDate,
    }));
  }, [
    data.currentCash,
    data.burnRate,
    data.revenueGrowthRate,
    data.expenseGrowthRate,
    data.fundInjection,
  ]);

  const handleFundInjectionChange = (amount: number) => {
    setData({
      ...data,
      fundInjection: {
        ...data.fundInjection,
        amount,
      },
    });
  };

  const handleFundInjectionDateChange = (date: Date) => {
    setData({
      ...data,
      fundInjection: {
        ...data.fundInjection,
        date,
      },
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md ">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8 rounded-t-xl">
        <h1 className="text-4xl font-bold mb-3 text-white">
          Runway Calculator
        </h1>
        <p className="text-sm mb-6 text-white">
          Your runway is calculated based on your current cash balance,
          projected revenue, and projected expenses. It represents the estimated
          time until your cash reserves are depleted.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-12">
        {/* Left section with inputs */}
        <div className="col-span-12 lg:col-span-7">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="border rounded-md p-4">
              <h3 className="text-sm font-medium mb-2">Revenue growth rate</h3>
              <SliderInput
                value={data.revenueGrowthRate}
                onChange={(val) => setData({ ...data, revenueGrowthRate: val })}
                min={0}
                max={1}
                step={0.01}
              />
            </div>
            <div className="border rounded-md p-4">
              <h3 className="text-sm font-medium mb-2">Expense growth rate</h3>
              <SliderInput
                value={data.expenseGrowthRate}
                onChange={(val) => setData({ ...data, expenseGrowthRate: val })}
                min={0}
                max={1}
                step={0.01}
              />
            </div>
            <div className="border rounded-md p-4">
              <h3 className="text-sm font-medium mb-2">Fund injection</h3>
              <div className="flex flex-col gap-2">
                <input
                  type="number"
                  value={data.fundInjection.amount}
                  onChange={(e) =>
                    handleFundInjectionChange(Number(e.target.value))
                  }
                  className="border rounded px-2 py-1 w-full"
                  placeholder="$"
                />
                <DateInput
                  value={data.fundInjection.date}
                  onChange={handleFundInjectionDateChange}
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium mb-2">Cash</h3>
            <CashProjectionChart data={data} />
          </div>
        </div>

        {/* Right section with metrics */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
          <div className="bg-green-100 rounded-md p-4">
            <h3 className="text-sm font-medium mb-2">Current burn rate</h3>
            <BurnRateChart burnRate={data.burnRate} />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm">(+)</span>
              <span className="text-3xl font-bold">${data.burnRate}</span>
            </div>
            <button
              onClick={resetNumber}
              className="mt-2 bg-white py-1 px-3 rounded border text-sm"
            >
              Reset number
            </button>
          </div>

          <WarningCard
            type="warning"
            title="Low cash warning"
            date={data.lowCashWarningDate}
            months={8}
          />

          <WarningCard
            type="danger"
            title="Projected runway"
            date={data.projectedRunwayDate}
            months={12}
          />
        </div>
      </div>
    </div>
  );
}
