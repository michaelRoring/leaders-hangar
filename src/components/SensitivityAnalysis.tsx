// src/components/SensitivityAnalysis.tsx
import React, { useState } from "react";
import { SensitivityData } from "../types/marketing-roi";

interface SensitivityAnalysisProps {
  data: SensitivityData[];
}

const SensitivityAnalysis: React.FC<SensitivityAnalysisProps> = ({ data }) => {
  const [selectedVariable, setSelectedVariable] = useState<string>(
    data[0]?.variable || ""
  );

  const getSelectedData = (): SensitivityData | undefined => {
    return data.find((item) => item.variable === selectedVariable);
  };

  const getCriticalityColor = (
    criticality: "low" | "medium" | "high"
  ): string => {
    switch (criticality) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getValueIncrement = (item: SensitivityData): number => {
    return (item.range[1] - item.range[0]) / (item.impact.length - 1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Sensitivity Analysis
        </h2>
        <p className="text-sm text-blue-600">
          Analyze how changes in key variables affect your ROI projections.
        </p>
      </div>

      {/* Variable Selection */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Select Variable to Analyze
        </h3>

        <div className="flex flex-wrap gap-2">
          {data.map((item) => (
            <button
              key={item.variable}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedVariable === item.variable
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedVariable(item.variable)}
            >
              {item.variable}
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getCriticalityColor(
                  item.criticality
                )}`}
              >
                {item.criticality}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Variable Details */}
      {getSelectedData() && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">
              {getSelectedData()?.variable} Sensitivity
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getCriticalityColor(
                getSelectedData()?.criticality || "medium"
              )}`}
            >
              {getSelectedData()?.criticality?.toUpperCase()} IMPACT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Current Value</div>
                <div className="text-2xl font-bold text-gray-800">
                  {getSelectedData()?.variable.includes("Rate")
                    ? `${getSelectedData()?.baseValue.toFixed(1)}%`
                    : getSelectedData()?.variable.includes("CAC") ||
                      getSelectedData()?.variable.includes("Value")
                    ? `$${getSelectedData()?.baseValue.toFixed(2)}`
                    : getSelectedData()?.baseValue.toFixed(2)}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Value Range</div>
                <div className="flex justify-between">
                  <span className="text-gray-800">
                    {getSelectedData()?.variable.includes("Rate")
                      ? `${getSelectedData()?.range[0].toFixed(1)}%`
                      : getSelectedData()?.variable.includes("CAC") ||
                        getSelectedData()?.variable.includes("Value")
                      ? `$${getSelectedData()?.range[0].toFixed(2)}`
                      : getSelectedData()?.range[0].toFixed(2)}
                  </span>
                  <span className="text-gray-800">
                    {getSelectedData()?.variable.includes("Rate")
                      ? `${getSelectedData()?.range[1].toFixed(1)}%`
                      : getSelectedData()?.variable.includes("CAC") ||
                        getSelectedData()?.variable.includes("Value")
                      ? `$${getSelectedData()?.range[1].toFixed(2)}`
                      : getSelectedData()?.range[1].toFixed(2)}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{
                      width: `${
                        (((getSelectedData()?.baseValue || 0) -
                          (getSelectedData()?.range[0] || 0)) /
                          ((getSelectedData()?.range[1] || 1) -
                            (getSelectedData()?.range[0] || 0))) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Interpretation
                </div>
                <p className="text-sm text-gray-600">
                  {getSelectedData()?.criticality === "high" &&
                    `${
                      getSelectedData()?.variable
                    } has a significant impact on your ROI. Small changes can drastically affect your campaign performance.`}
                  {getSelectedData()?.criticality === "medium" &&
                    `${
                      getSelectedData()?.variable
                    } has a moderate impact on your ROI. Monitor this metric regularly to maintain campaign efficiency.`}
                  {getSelectedData()?.criticality === "low" &&
                    `${
                      getSelectedData()?.variable
                    } has a minimal impact on your ROI. While important, other factors have more influence on your campaign success.`}
                </p>

                <div className="mt-3 text-xs text-gray-500">
                  A 10%{" "}
                  {getSelectedData()?.variable === "CAC"
                    ? "increase"
                    : "decrease"}{" "}
                  in {getSelectedData()?.variable}
                  could{" "}
                  {getSelectedData()?.variable === "CAC"
                    ? "decrease"
                    : "increase"}{" "}
                  your ROI by approximately
                  {
                    getSelectedData()?.impact[
                      getSelectedData()?.impact.length! > 6 ? 6 : 3
                    ]
                  }
                  %.
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-md border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700">
                    Impact on ROI
                  </h4>
                </div>
                <div className="p-4 h-64 flex flex-col justify-center">
                  {/* Bar chart representation of sensitivity */}
                  <div className="flex flex-col h-full justify-between">
                    {getSelectedData()?.impact.map((impact, index) => {
                      const value =
                        getSelectedData()?.range[0] ||
                        0 +
                          index *
                            getValueIncrement(
                              getSelectedData() as SensitivityData
                            );

                      // Determine if this is the base value
                      const isBaseValue =
                        Math.abs(value - (getSelectedData()?.baseValue || 0)) <
                        getValueIncrement(
                          getSelectedData() as SensitivityData
                        ) /
                          2;

                      return (
                        <div key={index} className="flex items-center h-8">
                          <div className="w-20 text-right pr-2 text-xs text-gray-600">
                            {getSelectedData()?.variable.includes("Rate")
                              ? `${value.toFixed(1)}%`
                              : getSelectedData()?.variable.includes("CAC") ||
                                getSelectedData()?.variable.includes("Value")
                              ? `$${value.toFixed(0)}`
                              : value.toFixed(1)}
                          </div>
                          <div className="flex-1 flex items-center">
                            <div
                              className={`h-6 rounded ${
                                impact < 0 ? "bg-red-400" : "bg-green-400"
                              } ${
                                isBaseValue ? "border-2 border-indigo-600" : ""
                              }`}
                              style={{
                                width: `${Math.abs(impact) * 2}%`,
                                minWidth: "2px",
                              }}
                            ></div>
                            <div className="ml-2 text-xs text-gray-700">
                              {impact > 0 ? "+" : ""}
                              {impact.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-indigo-50 p-3 rounded-md">
                <div className="text-sm font-medium text-indigo-800 mb-1">
                  Recommendation
                </div>
                <p className="text-sm text-indigo-700">
                  {getSelectedData()?.criticality === "high" &&
                    getSelectedData()?.variable === "CAC" &&
                    "Focus on reducing your Customer Acquisition Cost as it has the highest impact on your marketing ROI."}
                  {getSelectedData()?.criticality === "high" &&
                    getSelectedData()?.variable === "CLTV" &&
                    "Prioritize strategies to increase your Customer Lifetime Value for maximum impact on ROI."}
                  {getSelectedData()?.criticality === "medium" &&
                    "Monitor this variable closely and implement gradual optimization strategies."}
                  {getSelectedData()?.criticality === "low" &&
                    "This variable has less impact on your ROI. Focus your optimization efforts on higher-impact variables first."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Multi-variable Comparison */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Multi-variable Impact Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Variable
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Base Value
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Impact Level
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  -10% Change
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  +10% Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr
                  key={item.variable}
                  className={
                    selectedVariable === item.variable ? "bg-indigo-50" : ""
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.variable}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.variable.includes("Rate")
                        ? `${item.baseValue.toFixed(1)}%`
                        : item.variable.includes("CAC") ||
                          item.variable.includes("Value")
                        ? `$${item.baseValue.toFixed(2)}`
                        : item.baseValue.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCriticalityColor(
                        item.criticality
                      )}`}
                    >
                      {item.criticality.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm font-medium ${
                        item.impact[Math.floor(item.impact.length / 3)] < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {item.impact[Math.floor(item.impact.length / 3)] > 0
                        ? "+"
                        : ""}
                      {item.impact[Math.floor(item.impact.length / 3)].toFixed(
                        1
                      )}
                      % ROI
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm font-medium ${
                        item.impact[Math.floor((item.impact.length * 2) / 3)] <
                        0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {item.impact[Math.floor((item.impact.length * 2) / 3)] > 0
                        ? "+"
                        : ""}
                      {item.impact[
                        Math.floor((item.impact.length * 2) / 3)
                      ].toFixed(1)}
                      % ROI
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

export default SensitivityAnalysis;
