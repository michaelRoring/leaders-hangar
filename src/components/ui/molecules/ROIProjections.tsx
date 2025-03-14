// src/components/ROIProjections.tsx
import React, { useState } from "react";
import { MarketingMetrics, ScenarioData } from "../../../types/marketing-roi";

interface ROIProjectionsProps {
  metrics: MarketingMetrics;
  scenarios: ScenarioData[];
}

const ROIProjections: React.FC<ROIProjectionsProps> = ({
  metrics,
  scenarios,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<string>("Base Case");

  // Get the metrics for the currently selected scenario
  const activeMetrics =
    selectedScenario === "Base Case"
      ? metrics
      : scenarios.find((s) => s.name === selectedScenario)?.metrics || metrics;

  // Format a date to display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          ROI Projections
        </h2>
        <p className="text-sm text-blue-600">
          View detailed financial projections and compare different scenarios.
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Compare Scenarios
        </h3>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.name}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                selectedScenario === scenario.name
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedScenario(scenario.name)}
            >
              {scenario.name}
            </button>
          ))}
        </div>

        {selectedScenario !== "Base Case" && (
          <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-700">
              {scenarios.find((s) => s.name === selectedScenario)?.description}
            </p>
            <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
              <div
                className={`p-1 rounded ${
                  scenarios.find((s) => s.name === selectedScenario)
                    ?.budgetAdjustment === 0
                    ? "bg-gray-100 text-gray-700"
                    : scenarios.find((s) => s.name === selectedScenario)
                        ?.budgetAdjustment! > 0
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                Budget:{" "}
                {scenarios.find((s) => s.name === selectedScenario)
                  ?.budgetAdjustment! > 0
                  ? "+"
                  : ""}
                {
                  scenarios.find((s) => s.name === selectedScenario)
                    ?.budgetAdjustment
                }
                %
              </div>
              <div
                className={`p-1 rounded ${
                  scenarios.find((s) => s.name === selectedScenario)
                    ?.cacAdjustment === 0
                    ? "bg-gray-100 text-gray-700"
                    : scenarios.find((s) => s.name === selectedScenario)
                        ?.cacAdjustment! > 0
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                CAC:{" "}
                {scenarios.find((s) => s.name === selectedScenario)
                  ?.cacAdjustment! > 0
                  ? "+"
                  : ""}
                {
                  scenarios.find((s) => s.name === selectedScenario)
                    ?.cacAdjustment
                }
                %
              </div>
              <div
                className={`p-1 rounded ${
                  scenarios.find((s) => s.name === selectedScenario)
                    ?.cltvAdjustment === 0
                    ? "bg-gray-100 text-gray-700"
                    : scenarios.find((s) => s.name === selectedScenario)
                        ?.cltvAdjustment! < 0
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                CLTV:{" "}
                {scenarios.find((s) => s.name === selectedScenario)
                  ?.cltvAdjustment! > 0
                  ? "+"
                  : ""}
                {
                  scenarios.find((s) => s.name === selectedScenario)
                    ?.cltvAdjustment
                }
                %
              </div>
              <div
                className={`p-1 rounded ${
                  scenarios.find((s) => s.name === selectedScenario)
                    ?.conversionAdjustment === 0
                    ? "bg-gray-100 text-gray-700"
                    : scenarios.find((s) => s.name === selectedScenario)
                        ?.conversionAdjustment! < 0
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                Conversion:{" "}
                {scenarios.find((s) => s.name === selectedScenario)
                  ?.conversionAdjustment! > 0
                  ? "+"
                  : ""}
                {
                  scenarios.find((s) => s.name === selectedScenario)
                    ?.conversionAdjustment
                }
                %
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Financial Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Metrics */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Core Metrics
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">
                Customer Acquisition Cost
              </div>
              <div className="mt-1 text-2xl font-bold text-gray-800">
                ${activeMetrics.cac.toFixed(2)}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">
                Customer Lifetime Value
              </div>
              <div className="mt-1 text-2xl font-bold text-gray-800">
                ${activeMetrics.cltv.toFixed(0)}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">CLTV:CAC Ratio</div>
              <div
                className={`mt-1 text-2xl font-bold ${
                  activeMetrics.cacToCltvRatio < 1
                    ? "text-red-600"
                    : activeMetrics.cacToCltvRatio < 3
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {activeMetrics.cacToCltvRatio.toFixed(1)}x
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">Payback Period</div>
              <div className="mt-1 text-2xl font-bold text-gray-800">
                {activeMetrics.paybackPeriod.toFixed(1)} months
              </div>
            </div>
          </div>
        </div>

        {/* Financial Returns */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Financial Returns
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">Marketing ROI</div>
              <div
                className={`mt-1 text-2xl font-bold ${
                  activeMetrics.roi < 0
                    ? "text-red-600"
                    : activeMetrics.roi < 50
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {activeMetrics.roi.toFixed(1)}%
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">Break-Even Point</div>
              <div className="mt-1 text-2xl font-bold text-gray-800">
                {formatDate(activeMetrics.breakEvenPoint)}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">Net Present Value</div>
              <div
                className={`mt-1 text-2xl font-bold ${
                  activeMetrics.npv < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                ${activeMetrics.npv.toFixed(0)}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">
                Internal Rate of Return
              </div>
              <div
                className={`mt-1 text-2xl font-bold ${
                  activeMetrics.irr < 10
                    ? "text-red-600"
                    : activeMetrics.irr < 20
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {activeMetrics.irr.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue & Profit Projections */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Revenue & Profit Projections
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="mt-1 text-2xl font-bold text-gray-800">
              $
              {activeMetrics.totalRevenue.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm text-gray-500">Total Profit</div>
            <div
              className={`mt-1 text-2xl font-bold ${
                activeMetrics.totalProfit < 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              $
              {activeMetrics.totalProfit.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm text-gray-500">Profit Margin</div>
            <div
              className={`mt-1 text-2xl font-bold ${
                activeMetrics.marginContribution < 0
                  ? "text-red-600"
                  : activeMetrics.marginContribution < 20
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {activeMetrics.marginContribution.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Bar chart comparison would go here */}
        <div className="mt-6 h-64 bg-gray-100 rounded-md flex items-center justify-center">
          <div className="text-gray-500">
            Revenue & Profit Chart Visualization
          </div>
        </div>
      </div>

      {/* Scenario Comparison Table */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Scenario Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Scenario
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ROI
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Revenue
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Profit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Break-Even
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  CAC
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scenarios.map((scenario) => (
                <tr
                  key={scenario.name}
                  className={
                    selectedScenario === scenario.name ? "bg-indigo-50" : ""
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {scenario.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm font-medium ${
                        scenario.metrics.roi < 0
                          ? "text-red-600"
                          : scenario.metrics.roi < 50
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {scenario.metrics.roi.toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      $
                      {scenario.metrics.totalRevenue.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm font-medium ${
                        scenario.metrics.totalProfit < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      $
                      {scenario.metrics.totalProfit.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(scenario.metrics.breakEvenPoint)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${scenario.metrics.cac.toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ROIProjections;
