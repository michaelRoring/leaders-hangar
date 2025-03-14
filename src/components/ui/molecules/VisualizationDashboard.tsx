// src/components/VisualizationDashboard.tsx
import React, { useState } from "react";
import {
  MarketingMetrics,
  MarketingChannel,
  CustomerSegment,
  ScenarioData,
} from "../../../types/marketing-roi";

// Note: In a real implementation, this would use a charting library like Chart.js or Recharts
// Here we'll simulate the charts with divs and CSS for simplicity

interface VisualizationDashboardProps {
  metrics: MarketingMetrics;
  channels: MarketingChannel[];
  segments: CustomerSegment[];
  scenarios: ScenarioData[];
}

const VisualizationDashboard: React.FC<VisualizationDashboardProps> = ({
  metrics,
  channels,
  segments,
  scenarios,
}) => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const getTotalCLTV = (segment: CustomerSegment): number => {
    return (
      segment.averageOrderValue *
      segment.purchaseFrequency *
      (segment.lifetimeMonths / 12) *
      (1 - segment.churnRate / 100)
    );
  };

  const getChannelEfficiency = (channel: MarketingChannel): number => {
    return (
      (channel.averageOrderValue * (channel.conversionRate / 100)) / channel.cac
    );
  };

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
          ROI Visualization Dashboard
        </h2>
        <p className="text-sm text-blue-600">
          Interactive visualizations to help you analyze your marketing
          performance and ROI.
        </p>
      </div>

      {/* Visualization Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {["overview", "channels", "segments", "scenarios", "timeline"].map(
            (tab) => (
              <button
                key={tab}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Dashboard Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ROI Gauge */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Campaign ROI
              </h3>

              <div className="flex flex-col items-center justify-center">
                {/* Gauge visualization */}
                <div className="relative w-48 h-24 overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gray-200 rounded-t-full"></div>
                  <div
                    className={`absolute bottom-0 left-0 right-0 rounded-t-full ${
                      metrics.roi < 0
                        ? "bg-red-500"
                        : metrics.roi < 50
                        ? "bg-yellow-500"
                        : metrics.roi < 100
                        ? "bg-green-500"
                        : "bg-emerald-500"
                    }`}
                    style={{
                      height: `${Math.min(100, Math.max(0, metrics.roi / 2))}%`,
                    }}
                  ></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full"></div>
                </div>

                <div className="text-3xl font-bold mb-1">
                  {metrics.roi.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-500">
                  {metrics.roi < 0
                    ? "Negative Return"
                    : metrics.roi < 50
                    ? "Moderate Return"
                    : metrics.roi < 100
                    ? "Good Return"
                    : "Excellent Return"}
                </div>
              </div>
            </div>

            {/* Revenue vs Costs */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Revenue vs Costs
              </h3>

              <div className="flex justify-center space-x-6">
                <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-500 mb-2">Revenue</div>
                  <div className="relative w-24 bg-gray-200 rounded-md overflow-hidden">
                    <div
                      className="bg-green-500 w-full"
                      style={{ height: "150px" }}
                    ></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white font-bold">
                      ${Math.round(metrics.totalRevenue / 1000)}K
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-500 mb-2">Costs</div>
                  <div className="relative w-24 bg-gray-200 rounded-md overflow-hidden">
                    <div
                      className="bg-red-500 w-full"
                      style={{
                        height: `${
                          (150 * (metrics.totalRevenue - metrics.totalProfit)) /
                          metrics.totalRevenue
                        }px`,
                      }}
                    ></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white font-bold">
                      $
                      {Math.round(
                        (metrics.totalRevenue - metrics.totalProfit) / 1000
                      )}
                      K
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-500 mb-2">Profit</div>
                  <div className="relative w-24 bg-gray-200 rounded-md overflow-hidden">
                    <div
                      className="bg-blue-500 w-full"
                      style={{
                        height: `${
                          (150 * metrics.totalProfit) / metrics.totalRevenue
                        }px`,
                      }}
                    ></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white font-bold">
                      ${Math.round(metrics.totalProfit / 1000)}K
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center text-sm text-gray-500">
                Profit Margin: {metrics.marginContribution.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Key Performance Indicators
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-md text-center">
                <div className="text-sm text-gray-500 mb-1">CAC</div>
                <div className="text-xl font-bold text-gray-800">
                  ${metrics.cac.toFixed(2)}
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md text-center">
                <div className="text-sm text-gray-500 mb-1">CLTV</div>
                <div className="text-xl font-bold text-gray-800">
                  ${metrics.cltv.toFixed(0)}
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md text-center">
                <div className="text-sm text-gray-500 mb-1">CLTV:CAC</div>
                <div
                  className={`text-xl font-bold ${
                    metrics.cacToCltvRatio < 1
                      ? "text-red-600"
                      : metrics.cacToCltvRatio < 3
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {metrics.cacToCltvRatio.toFixed(1)}x
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md text-center">
                <div className="text-sm text-gray-500 mb-1">Payback Period</div>
                <div
                  className={`text-xl font-bold ${
                    metrics.paybackPeriod > 12
                      ? "text-red-600"
                      : metrics.paybackPeriod > 6
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {metrics.paybackPeriod.toFixed(1)} mo
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Overview */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Timeline & Key Dates
            </h3>

            <div className="relative h-16 bg-gray-100 rounded-lg mt-4 mb-2">
              {/* Timeline visualization */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-1 bg-gray-300"></div>
              </div>

              {/* Today Marker */}
              <div className="absolute top-0 left-0 h-full flex items-center">
                <div className="h-8 w-1 bg-blue-500"></div>
                <div className="absolute top-full mt-1 text-xs text-blue-600 whitespace-nowrap">
                  Today
                </div>
              </div>

              {/* Break-even Marker */}
              <div
                className="absolute top-0 h-full flex items-center"
                style={{
                  left: "40%",
                }}
              >
                <div className="h-8 w-1 bg-green-500"></div>
                <div className="absolute top-full mt-1 text-xs text-green-600 whitespace-nowrap">
                  Break-even: {formatDate(metrics.breakEvenPoint)}
                </div>
              </div>

              {/* Projected Profitability */}
              <div
                className="absolute top-0 h-full flex items-center"
                style={{
                  left: "75%",
                }}
              >
                <div className="h-8 w-1 bg-purple-500"></div>
                <div className="absolute top-full mt-1 text-xs text-purple-600 whitespace-nowrap">
                  Profitability: {formatDate(metrics.profitabilityDate!)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "channels" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Marketing Channel Performance
            </h3>

            {/* Channel Budget Allocation */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-2">
                Budget Allocation
              </h4>
              <div className="h-10 bg-gray-200 rounded-md overflow-hidden flex">
                {channels
                  .filter((channel) => channel.enabled)
                  .map((channel, index) => {
                    const totalBudget = channels
                      .filter((ch) => ch.enabled)
                      .reduce((sum, ch) => sum + ch.budget, 0);
                    const percentage = (channel.budget / totalBudget) * 100;

                    const colors = [
                      "bg-blue-500",
                      "bg-green-500",
                      "bg-purple-500",
                      "bg-yellow-500",
                      "bg-red-500",
                      "bg-indigo-500",
                    ];

                    return (
                      <div
                        key={channel.id}
                        className={`h-full ${
                          colors[index % colors.length]
                        } relative group`}
                        style={{ width: `${percentage}%` }}
                      >
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap transition-opacity">
                          {channel.name}: ${channel.budget.toLocaleString()} (
                          {percentage.toFixed(1)}%)
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-2 text-xs text-gray-500 text-right">
                Total Budget: $
                {channels
                  .reduce((sum, ch) => sum + (ch.enabled ? ch.budget : 0), 0)
                  .toLocaleString()}
              </div>
            </div>

            {/* Channel Efficiency */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-700 mb-2">
                Channel Efficiency
              </h4>
              <div className="space-y-2">
                {channels
                  .filter((channel) => channel.enabled)
                  .sort(
                    (a, b) => getChannelEfficiency(b) - getChannelEfficiency(a)
                  )
                  .map((channel) => {
                    const efficiency = getChannelEfficiency(channel);

                    return (
                      <div key={channel.id} className="flex items-center">
                        <div className="w-36 text-sm text-gray-700 truncate">
                          {channel.name}
                        </div>
                        <div className="flex-1 mx-2">
                          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                efficiency < 1
                                  ? "bg-red-500"
                                  : efficiency < 1.5
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{
                                width: `${Math.min(100, efficiency * 33)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-16 text-right text-sm font-medium">
                          {efficiency.toFixed(2)}x
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Efficiency = (Average Order Value × Conversion Rate) ÷ CAC
              </div>
            </div>
          </div>

          {/* Channel Comparison Matrix */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Channel Performance Matrix
            </h3>

            {/* This would be a scatter plot in a real implementation */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-50 border border-gray-200 rounded-lg p-4 relative">
              {/* X and Y axes */}
              <div className="absolute left-12 right-8 bottom-12 top-8">
                <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-300"></div>
                <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gray-300"></div>

                {/* Plot points for each channel */}
                {channels
                  .filter((channel) => channel.enabled)
                  .map((channel, index) => {
                    const x = channel.conversionRate / 5; // scale to 0-1 range
                    const y = channel.cac / 100; // scale to 0-1 range
                    const size = channel.budget / 5000; // scale bubble size

                    const colors = [
                      "bg-blue-500",
                      "bg-green-500",
                      "bg-purple-500",
                      "bg-yellow-500",
                      "bg-red-500",
                      "bg-indigo-500",
                    ];

                    return (
                      <div
                        key={channel.id}
                        className={`absolute rounded-full ${
                          colors[index % colors.length]
                        } opacity-70 flex items-center justify-center text-white text-xs font-bold`}
                        style={{
                          left: `${x * 100}%`,
                          bottom: `${(1 - y) * 100}%`,
                          width: `${Math.max(20, size * 30)}px`,
                          height: `${Math.max(20, size * 30)}px`,
                          transform: "translate(-50%, 50%)",
                        }}
                      >
                        {channel.name.substring(0, 2)}
                        <div className="opacity-0 hover:opacity-100 absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap transition-opacity">
                          {channel.name}: ${channel.budget.toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Axis labels */}
              <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-500">
                Conversion Rate (%)
              </div>
              <div className="absolute left-4 top-1/2 -rotate-90 transform origin-center text-xs text-gray-500 whitespace-nowrap">
                Cost Per Acquisition ($)
              </div>
            </div>

            <div className="mt-2 text-xs text-gray-500 text-center">
              Bubble size represents channel budget. Ideal channels appear in
              top right (high conversion, low CAC).
            </div>
          </div>

          {/* Channel Metrics Comparison */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Channel Metrics Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Channel
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Budget
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CAC
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Conv. Rate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CTR
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Avg. Order
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Efficiency
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {channels
                    .filter((channel) => channel.enabled)
                    .map((channel) => {
                      const efficiency = getChannelEfficiency(channel);

                      return (
                        <tr key={channel.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {channel.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${channel.budget.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${channel.cac.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {channel.conversionRate.toFixed(1)}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {channel.clickThroughRate.toFixed(1)}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${channel.averageOrderValue}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                efficiency < 1
                                  ? "bg-red-100 text-red-800"
                                  : efficiency < 1.5
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {efficiency.toFixed(2)}x
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "segments" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Customer Segment Analysis
            </h3>

            {/* Segment Distribution */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-2">
                Customer Distribution
              </h4>
              <div className="h-10 bg-gray-200 rounded-md overflow-hidden flex">
                {segments.map((segment, index) => {
                  const colors = [
                    "bg-blue-500",
                    "bg-green-500",
                    "bg-purple-500",
                    "bg-yellow-500",
                    "bg-red-500",
                    "bg-indigo-500",
                  ];

                  return (
                    <div
                      key={segment.id}
                      className={`h-full ${
                        colors[index % colors.length]
                      } relative group`}
                      style={{ width: `${segment.percentage}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap transition-opacity">
                        {segment.name}: {segment.percentage}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Segment LTV Comparison */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-700 mb-2">
                Lifetime Value by Segment
              </h4>
              <div className="space-y-2">
                {segments
                  .sort((a, b) => getTotalCLTV(b) - getTotalCLTV(a))
                  .map((segment) => {
                    const cltv = getTotalCLTV(segment);
                    const maxCLTV = Math.max(...segments.map(getTotalCLTV));

                    return (
                      <div key={segment.id} className="flex items-center">
                        <div className="w-36 text-sm text-gray-700 truncate">
                          {segment.name}
                        </div>
                        <div className="flex-1 mx-2">
                          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(cltv / maxCLTV) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-20 text-right text-sm font-medium">
                          ${cltv.toFixed(0)}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* LTV vs Churn Quadrant */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-700 mb-2">
                LTV vs Churn Analysis
              </h4>

              <div className="aspect-w-16 aspect-h-9 bg-gray-50 border border-gray-200 rounded-lg p-4 relative">
                {/* X and Y axes */}
                <div className="absolute left-12 right-8 bottom-12 top-8">
                  <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-300"></div>
                  <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gray-300"></div>

                  {/* Quadrant dividers */}
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 dashed"></div>
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-200 dashed"></div>

                  {/* Quadrant labels */}
                  <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-400">
                    Low Value,
                    <br />
                    Low Churn
                  </div>
                  <div className="absolute top-1/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-400">
                    High Value,
                    <br />
                    Low Churn
                  </div>
                  <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-400">
                    Low Value,
                    <br />
                    High Churn
                  </div>
                  <div className="absolute top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-400">
                    High Value,
                    <br />
                    High Churn
                  </div>

                  {/* Plot points for each segment */}
                  {segments.map((segment, index) => {
                    const x = getTotalCLTV(segment) / 1000; // scale to 0-1 range
                    const y = segment.churnRate / 30; // scale to 0-1 range
                    const size = segment.percentage / 100; // scale bubble size

                    const colors = [
                      "bg-blue-500",
                      "bg-green-500",
                      "bg-purple-500",
                      "bg-yellow-500",
                      "bg-red-500",
                      "bg-indigo-500",
                    ];

                    return (
                      <div
                        key={segment.id}
                        className={`absolute rounded-full ${
                          colors[index % colors.length]
                        } opacity-70 flex items-center justify-center text-white text-xs font-bold`}
                        style={{
                          left: `${Math.min(95, Math.max(5, x * 100))}%`,
                          top: `${Math.min(95, Math.max(5, y * 100))}%`,
                          width: `${Math.max(20, size * 60)}px`,
                          height: `${Math.max(20, size * 60)}px`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {segment.name.substring(0, 2)}
                        <div className="opacity-0 hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap transition-opacity">
                          {segment.name}: {segment.percentage}%
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Axis labels */}
                <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-500">
                  Customer Lifetime Value ($)
                </div>
                <div className="absolute left-4 top-1/2 -rotate-90 transform origin-center text-xs text-gray-500 whitespace-nowrap">
                  Churn Rate (%)
                </div>
              </div>
            </div>

            {/* Segment Metrics Matrix */}
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Segment
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      % of Customers
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Avg. Order Value
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Purchase Frequency
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Churn Rate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Lifetime (Months)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total LTV
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {segments.map((segment) => (
                    <tr key={segment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {segment.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {segment.percentage}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${segment.averageOrderValue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {segment.purchaseFrequency}/year
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {segment.churnRate}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {segment.lifetimeMonths}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        <span
                          className={`text-sm ${
                            getTotalCLTV(segment) > 500
                              ? "text-green-600"
                              : getTotalCLTV(segment) > 200
                              ? "text-blue-600"
                              : "text-gray-600"
                          }`}
                        >
                          ${getTotalCLTV(segment).toFixed(0)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "scenarios" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Scenario Comparison
            </h3>

            {/* Scenario ROI Comparison */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-2">
                ROI by Scenario
              </h4>
              <div className="space-y-2">
                {scenarios.map((scenario) => {
                  return (
                    <div key={scenario.name} className="flex items-center">
                      <div className="w-36 text-sm text-gray-700 truncate">
                        {scenario.name}
                      </div>
                      <div className="flex-1 mx-2">
                        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              scenario.metrics.roi < 0
                                ? "bg-red-500"
                                : scenario.metrics.roi < 50
                                ? "bg-yellow-500"
                                : scenario.metrics.roi < 100
                                ? "bg-green-500"
                                : "bg-emerald-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(0, scenario.metrics.roi / 2)
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-20 text-right text-sm font-medium">
                        {scenario.metrics.roi.toFixed(1)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scenario Revenue & Profit Comparison */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-700 mb-2">
                Revenue & Profit by Scenario
              </h4>

              <div className="relative h-64 mt-4">
                {/* This would be a proper chart in a real implementation */}
                <div className="absolute inset-0 flex items-end justify-around">
                  {scenarios.map((scenario, index) => {
                    const maxRevenue = Math.max(
                      ...scenarios.map((s) => s.metrics.totalRevenue)
                    );
                    const revenueHeight =
                      (scenario.metrics.totalRevenue / maxRevenue) * 100;
                    const profitHeight =
                      (scenario.metrics.totalProfit /
                        scenario.metrics.totalRevenue) *
                      revenueHeight;

                    return (
                      <div
                        key={scenario.name}
                        className="flex flex-col items-center"
                      >
                        <div className="relative mb-2 w-16">
                          <div
                            className="bg-blue-200 w-full rounded-t-sm"
                            style={{ height: `${revenueHeight}%` }}
                          ></div>
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-sm"
                            style={{ height: `${profitHeight}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 truncate w-20 text-center">
                          {scenario.name}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between items-start">
                  <div className="text-xs text-gray-500">Revenue</div>
                  <div className="text-xs text-gray-500">Profit</div>
                </div>
              </div>
            </div>

            {/* Break-even Comparison */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-700 mb-2">
                Break-even Timeline
              </h4>

              <div className="relative h-16 bg-gray-100 rounded-lg mt-4 mb-2">
                {/* Timeline visualization */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-1 bg-gray-300"></div>
                </div>

                {/* Scenario break-even points */}
                {scenarios.map((scenario, index) => {
                  const colors = [
                    "bg-blue-500",
                    "bg-green-500",
                    "bg-purple-500",
                    "bg-yellow-500",
                    "bg-red-500",
                    "bg-indigo-500",
                  ];

                  // Position based on date (simplified for example)
                  const position = index * 15 + 10;

                  return (
                    <div
                      key={scenario.name}
                      className="absolute top-0 h-full flex items-center"
                      style={{
                        left: `${position}%`,
                      }}
                    >
                      <div
                        className={`h-8 w-1 ${colors[index % colors.length]}`}
                      ></div>
                      <div
                        className="absolute top-full mt-1 text-xs text-gray-600 whitespace-nowrap"
                        style={{
                          color: colors[index % colors.length].replace(
                            "bg-",
                            "text-"
                          ),
                        }}
                      >
                        {scenario.name}:{" "}
                        {formatDate(scenario.metrics.breakEvenPoint)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scenario Detailed Metrics */}
            <div className="mt-6 overflow-x-auto">
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
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CLTV:CAC
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scenarios.map((scenario) => (
                    <tr key={scenario.name}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {scenario.name}
                        <div className="text-xs text-gray-500">
                          {scenario.description}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $
                        {scenario.metrics.totalRevenue.toLocaleString(
                          undefined,
                          { maximumFractionDigits: 0 }
                        )}
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
                          {scenario.metrics.totalProfit.toLocaleString(
                            undefined,
                            { maximumFractionDigits: 0 }
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(scenario.metrics.breakEvenPoint)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${scenario.metrics.cac.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm font-medium ${
                            scenario.metrics.cacToCltvRatio < 1
                              ? "text-red-600"
                              : scenario.metrics.cacToCltvRatio < 3
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {scenario.metrics.cacToCltvRatio.toFixed(1)}x
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              ROI Timeline Projections
            </h3>

            {/* Revenue & Profit Timeline */}
            <div className="h-64 bg-gray-50 border border-gray-200 rounded-lg p-4 relative">
              {/* This would be a proper line chart in a real implementation */}
              <div className="absolute inset-0 flex items-end">
                {/* Y axis */}
                <div className="absolute top-0 bottom-0 left-12 w-0.5 bg-gray-200"></div>

                {/* X axis */}
                <div className="absolute left-12 right-8 bottom-8 h-0.5 bg-gray-200"></div>

                {/* Profit curve */}
                <svg
                  className="absolute left-12 right-8 top-4 bottom-8 overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M0,100 C10,95 20,85 30,70 C40,55 50,40 60,30 C70,20 80,15 90,10 L100,5"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                </svg>

                {/* Revenue curve */}
                <svg
                  className="absolute left-12 right-8 top-4 bottom-8 overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M0,90 C10,85 20,75 30,65 C40,55 50,45 60,40 C70,35 80,30 90,25 L100,20"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="4"
                  />
                </svg>

                {/* Break-even point marker */}
                <div
                  className="absolute bottom-8 w-0.5 h-full bg-red-400 flex flex-col items-center"
                  style={{ left: "calc(12px + 45%)" }}
                >
                  <div className="absolute bottom-full mb-1 transform -translate-x-1/2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                    Break-even
                  </div>
                </div>

                {/* Month labels */}
                <div className="absolute left-12 right-8 bottom-0 flex justify-between">
                  <div className="text-xs text-gray-500">Now</div>
                  <div className="text-xs text-gray-500">+3 mo</div>
                  <div className="text-xs text-gray-500">+6 mo</div>
                  <div className="text-xs text-gray-500">+9 mo</div>
                  <div className="text-xs text-gray-500">+12 mo</div>
                </div>
              </div>

              {/* Chart legend */}
              <div className="absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded border border-gray-200">
                <div className="flex items-center text-xs">
                  <div className="w-3 h-0.5 bg-blue-500 mr-1"></div>
                  <div className="text-gray-600">Profit</div>
                </div>
                <div className="flex items-center text-xs mt-1">
                  <div className="w-3 h-0.5 bg-green-500 mr-1 dashed"></div>
                  <div className="text-gray-600">Revenue</div>
                </div>
              </div>
            </div>

            {/* Cumulative Cash Flow */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-700 mb-2">
                Cumulative Cash Flow
              </h4>

              <div className="h-64 bg-gray-50 border border-gray-200 rounded-lg p-4 relative">
                {/* This would be a proper area chart in a real implementation */}
                <div className="absolute inset-0 flex items-end">
                  {/* Y axis */}
                  <div className="absolute top-0 bottom-0 left-12 w-0.5 bg-gray-200"></div>

                  {/* X axis (zero line) */}
                  <div className="absolute left-12 right-8 bottom-32 h-0.5 bg-gray-500"></div>

                  {/* X axis bottom */}
                  <div className="absolute left-12 right-8 bottom-8 h-0.5 bg-gray-200"></div>

                  {/* Cumulative cash flow curve */}
                  <svg
                    className="absolute left-12 right-8 top-4 bottom-8 overflow-visible"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    <defs>
                      <linearGradient
                        id="cashFlowGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "#3B82F6", stopOpacity: 0.8 }}
                        />
                        <stop
                          offset="50%"
                          style={{ stopColor: "#3B82F6", stopOpacity: 0.3 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "#EF4444", stopOpacity: 0.3 }}
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 C10,85 20,87 30,70 C40,50 45,30 50,20 C55,10 60,0 70,-10 C80,-20 90,-25 100,-30"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,80 C10,85 20,87 30,70 C40,50 45,30 50,20 C55,10 60,0 70,-10 C80,-20 90,-25 100,-30 V50 H0 Z"
                      fill="url(#cashFlowGradient)"
                    />
                  </svg>

                  {/* Break-even point marker */}
                  <div
                    className="absolute bottom-8 w-0.5 h-full bg-green-400 flex flex-col items-center"
                    style={{ left: "calc(12px + 60%)" }}
                  >
                    <div className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                      Break-even
                    </div>
                  </div>

                  {/* Month labels */}
                  <div className="absolute left-12 right-8 bottom-0 flex justify-between">
                    <div className="text-xs text-gray-500">Now</div>
                    <div className="text-xs text-gray-500">+3 mo</div>
                    <div className="text-xs text-gray-500">+6 mo</div>
                    <div className="text-xs text-gray-500">+9 mo</div>
                    <div className="text-xs text-gray-500">+12 mo</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Timeline Events */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-700 mb-2">
                Key Projection Milestones
              </h4>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="relative pb-12">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                  {/* Events */}
                  <div className="relative flex items-start mb-6">
                    <div className="h-3 w-3 rounded-full bg-blue-500 absolute mt-1.5 ml-4.5"></div>
                    <div className="ml-12">
                      <h5 className="text-sm font-medium text-gray-800">
                        Campaign Launch
                      </h5>
                      <p className="text-xs text-gray-500">Today</p>
                      <p className="mt-1 text-xs text-gray-600">
                        Initial investment of $
                        {metrics.totalRevenue - metrics.totalProfit} allocated
                        across channels.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start mb-6">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 absolute mt-1.5 ml-4.5"></div>
                    <div className="ml-12">
                      <h5 className="text-sm font-medium text-gray-800">
                        First Revenue
                      </h5>
                      <p className="text-xs text-gray-500">+1 month</p>
                      <p className="mt-1 text-xs text-gray-600">
                        Expected first significant revenue generation from
                        initial customers.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start mb-6">
                    <div className="h-3 w-3 rounded-full bg-red-500 absolute mt-1.5 ml-4.5"></div>
                    <div className="ml-12">
                      <h5 className="text-sm font-medium text-gray-800">
                        Maximum Negative Cash Flow
                      </h5>
                      <p className="text-xs text-gray-500">+3 months</p>
                      <p className="mt-1 text-xs text-gray-600">
                        Peak of investment before returns start outpacing costs.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start mb-6">
                    <div className="h-3 w-3 rounded-full bg-green-500 absolute mt-1.5 ml-4.5"></div>
                    <div className="ml-12">
                      <h5 className="text-sm font-medium text-gray-800">
                        Break-even Point
                      </h5>
                      <p className="text-xs text-gray-500">
                        {formatDate(metrics.breakEvenPoint)}
                      </p>
                      <p className="mt-1 text-xs text-gray-600">
                        Campaign recovers all initial investments and begins
                        generating net profit.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="h-3 w-3 rounded-full bg-purple-500 absolute mt-1.5 ml-4.5"></div>
                    <div className="ml-12">
                      <h5 className="text-sm font-medium text-gray-800">
                        Projected Profitability
                      </h5>
                      <p className="text-xs text-gray-500">
                        {formatDate(metrics.profitabilityDate!)}
                      </p>
                      <p className="mt-1 text-xs text-gray-600">
                        Target ROI of {metrics.roi.toFixed(1)}% achieved with
                        total profit of $
                        {metrics.totalProfit.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualizationDashboard;
