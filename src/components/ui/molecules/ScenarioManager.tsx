// src/components/ScenarioManager.tsx
import React, { useState, useEffect } from "react";
import { ScenarioData, MarketingMetrics } from "../../../types/marketing-roi";

interface ScenarioManagerProps {
  scenarios: ScenarioData[];
  baseMetrics: MarketingMetrics;
  onSaveScenario: (scenario: ScenarioData) => void;
  onDeleteScenario: (scenarioName: string) => void;
}

const ScenarioManager: React.FC<ScenarioManagerProps> = ({
  scenarios,
  baseMetrics,
  onSaveScenario,
  onDeleteScenario,
}) => {
  const [showNewScenario, setShowNewScenario] = useState<boolean>(false);
  const [editingScenario, setEditingScenario] = useState<ScenarioData | null>(
    null
  );
  const [newScenario, setNewScenario] = useState<ScenarioData>({
    name: "",
    description: "",
    budgetAdjustment: 0,
    cacAdjustment: 0,
    cltvAdjustment: 0,
    conversionAdjustment: 0,
    metrics: { ...baseMetrics },
  });

  // Reset new scenario when entering edit mode
  useEffect(() => {
    if (showNewScenario) {
      setNewScenario({
        name: "",
        description: "",
        budgetAdjustment: 0,
        cacAdjustment: 0,
        cltvAdjustment: 0,
        conversionAdjustment: 0,
        metrics: { ...baseMetrics },
      });
    }
  }, [showNewScenario, baseMetrics]);

  // Update metrics when adjustments change
  useEffect(() => {
    if (showNewScenario || editingScenario) {
      const scenarioToUpdate = editingScenario || newScenario;

      // Simple approximation of how adjustments affect metrics
      // In a real app, you'd have more sophisticated calculations
      const adjustedMetrics = {
        ...baseMetrics,
        cac: baseMetrics.cac * (1 + scenarioToUpdate.cacAdjustment / 100),
        cltv: baseMetrics.cltv * (1 + scenarioToUpdate.cltvAdjustment / 100),
      };

      // Recalculate derived metrics
      adjustedMetrics.cacToCltvRatio =
        adjustedMetrics.cltv / adjustedMetrics.cac;

      // Adjust total revenue and profit based on budget and conversion adjustments
      const revenueFactor =
        (1 + scenarioToUpdate.budgetAdjustment / 100) *
        (1 + scenarioToUpdate.conversionAdjustment / 100);
      adjustedMetrics.totalRevenue = baseMetrics.totalRevenue * revenueFactor;

      // Adjust total cost based on budget adjustment
      const totalCost =
        (baseMetrics.totalRevenue - baseMetrics.totalProfit) *
        (1 + scenarioToUpdate.budgetAdjustment / 100);

      adjustedMetrics.totalProfit = adjustedMetrics.totalRevenue - totalCost;
      adjustedMetrics.roi = (adjustedMetrics.totalProfit / totalCost) * 100;
      adjustedMetrics.marginContribution =
        (adjustedMetrics.totalProfit / adjustedMetrics.totalRevenue) * 100;

      // Approximate new break-even point
      const breakEvenShift =
        (scenarioToUpdate.budgetAdjustment -
          scenarioToUpdate.conversionAdjustment) /
        10;
      const newBreakEvenDate = new Date(baseMetrics.breakEvenPoint);
      newBreakEvenDate.setDate(
        newBreakEvenDate.getDate() + Math.round(breakEvenShift * 30)
      );
      adjustedMetrics.breakEvenPoint = newBreakEvenDate;

      // Approximate new payback period
      adjustedMetrics.paybackPeriod =
        baseMetrics.paybackPeriod *
        (1 +
          (scenarioToUpdate.cacAdjustment - scenarioToUpdate.cltvAdjustment) /
            100);

      if (editingScenario) {
        setEditingScenario({
          ...editingScenario,
          metrics: adjustedMetrics,
        });
      } else {
        setNewScenario({
          ...newScenario,
          metrics: adjustedMetrics,
        });
      }
    }
  }, [
    newScenario.budgetAdjustment,
    newScenario.cacAdjustment,
    newScenario.cltvAdjustment,
    newScenario.conversionAdjustment,
    editingScenario?.budgetAdjustment,
    editingScenario?.cacAdjustment,
    editingScenario?.cltvAdjustment,
    editingScenario?.conversionAdjustment,
  ]);

  const handleSaveScenario = () => {
    if (editingScenario) {
      onSaveScenario(editingScenario);
      setEditingScenario(null);
    } else {
      onSaveScenario(newScenario);
      setShowNewScenario(false);
    }
  };

  const handleDeleteScenario = (scenarioName: string) => {
    if (
      confirm(`Are you sure you want to delete the scenario "${scenarioName}"?`)
    ) {
      onDeleteScenario(scenarioName);
    }
  };

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
          Scenario Management
        </h2>
        <p className="text-sm text-blue-600">
          Create and compare different marketing scenarios to make data-driven
          decisions.
        </p>
      </div>

      {/* Scenarios List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">
            Available Scenarios
          </h3>
          <button
            type="button"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              setEditingScenario(null);
              setShowNewScenario(true);
            }}
          >
            Create New Scenario
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {scenarios.map((scenario) => (
            <div key={scenario.name} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between">
                <div>
                  <h4 className="text-md font-medium text-gray-900">
                    {scenario.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {scenario.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setEditingScenario(scenario)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => handleDeleteScenario(scenario.name)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="bg-gray-100 p-2 rounded">
                  <div className="text-xs text-gray-500">Budget Adjustment</div>
                  <div
                    className={`font-medium ${
                      scenario.budgetAdjustment > 0
                        ? "text-red-600"
                        : scenario.budgetAdjustment < 0
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {scenario.budgetAdjustment > 0 ? "+" : ""}
                    {scenario.budgetAdjustment}%
                  </div>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <div className="text-xs text-gray-500">CAC Adjustment</div>
                  <div
                    className={`font-medium ${
                      scenario.cacAdjustment > 0
                        ? "text-red-600"
                        : scenario.cacAdjustment < 0
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {scenario.cacAdjustment > 0 ? "+" : ""}
                    {scenario.cacAdjustment}%
                  </div>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <div className="text-xs text-gray-500">CLTV Adjustment</div>
                  <div
                    className={`font-medium ${
                      scenario.cltvAdjustment > 0
                        ? "text-green-600"
                        : scenario.cltvAdjustment < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {scenario.cltvAdjustment > 0 ? "+" : ""}
                    {scenario.cltvAdjustment}%
                  </div>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <div className="text-xs text-gray-500">
                    Conversion Adjustment
                  </div>
                  <div
                    className={`font-medium ${
                      scenario.conversionAdjustment > 0
                        ? "text-green-600"
                        : scenario.conversionAdjustment < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {scenario.conversionAdjustment > 0 ? "+" : ""}
                    {scenario.conversionAdjustment}%
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="bg-gray-100 p-2 rounded">
                  <div className="text-xs text-gray-500">ROI</div>
                  <div
                    className={`font-medium ${
                      scenario.metrics.roi < 0
                        ? "text-red-600"
                        : scenario.metrics.roi < 50
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {scenario.metrics.roi.toFixed(1)}%
                  </div>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <div className="text-xs text-gray-500">Revenue</div>
                  <div className="font-medium text-gray-800">
                    $
                    {scenario.metrics.totalRevenue.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </div>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <div className="text-xs text-gray-500">Profit</div>
                  <div
                    className={`font-medium ${
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
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <div className="text-xs text-gray-500">Break-even</div>
                  <div className="font-medium text-gray-800">
                    {formatDate(scenario.metrics.breakEvenPoint)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {scenarios.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-500">
                No scenarios created yet. Click "Create New Scenario" to get
                started.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Scenario Editor */}
      {(showNewScenario || editingScenario) && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      {editingScenario
                        ? "Edit Scenario"
                        : "Create New Scenario"}
                    </h3>

                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Scenario Name
                          </label>
                          <input
                            type="text"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={
                              editingScenario
                                ? editingScenario.name
                                : newScenario.name
                            }
                            onChange={(e) => {
                              if (editingScenario) {
                                setEditingScenario({
                                  ...editingScenario,
                                  name: e.target.value,
                                });
                              } else {
                                setNewScenario({
                                  ...newScenario,
                                  name: e.target.value,
                                });
                              }
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={
                              editingScenario
                                ? editingScenario.description
                                : newScenario.description
                            }
                            onChange={(e) => {
                              if (editingScenario) {
                                setEditingScenario({
                                  ...editingScenario,
                                  description: e.target.value,
                                });
                              } else {
                                setNewScenario({
                                  ...newScenario,
                                  description: e.target.value,
                                });
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Scenario Adjustments
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Marketing Budget Adjustment
                            </label>
                            <div className="flex items-center">
                              <input
                                type="range"
                                min="-50"
                                max="100"
                                step="5"
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                value={
                                  editingScenario
                                    ? editingScenario.budgetAdjustment
                                    : newScenario.budgetAdjustment
                                }
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  if (editingScenario) {
                                    setEditingScenario({
                                      ...editingScenario,
                                      budgetAdjustment: value,
                                    });
                                  } else {
                                    setNewScenario({
                                      ...newScenario,
                                      budgetAdjustment: value,
                                    });
                                  }
                                }}
                              />
                              <span className="ml-2 text-sm font-medium w-14 text-right">
                                {editingScenario
                                  ? (editingScenario.budgetAdjustment > 0
                                      ? "+"
                                      : "") + editingScenario.budgetAdjustment
                                  : (newScenario.budgetAdjustment > 0
                                      ? "+"
                                      : "") + newScenario.budgetAdjustment}
                                %
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Adjust the total marketing budget up or down
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Customer Acquisition Cost (CAC) Adjustment
                            </label>
                            <div className="flex items-center">
                              <input
                                type="range"
                                min="-50"
                                max="50"
                                step="5"
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                value={
                                  editingScenario
                                    ? editingScenario.cacAdjustment
                                    : newScenario.cacAdjustment
                                }
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  if (editingScenario) {
                                    setEditingScenario({
                                      ...editingScenario,
                                      cacAdjustment: value,
                                    });
                                  } else {
                                    setNewScenario({
                                      ...newScenario,
                                      cacAdjustment: value,
                                    });
                                  }
                                }}
                              />
                              <span className="ml-2 text-sm font-medium w-14 text-right">
                                {editingScenario
                                  ? (editingScenario.cacAdjustment > 0
                                      ? "+"
                                      : "") + editingScenario.cacAdjustment
                                  : (newScenario.cacAdjustment > 0 ? "+" : "") +
                                    newScenario.cacAdjustment}
                                %
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Positive values increase CAC (worse), negative
                              values improve it (better)
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Customer Lifetime Value (CLTV) Adjustment
                            </label>
                            <div className="flex items-center">
                              <input
                                type="range"
                                min="-25"
                                max="50"
                                step="5"
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                value={
                                  editingScenario
                                    ? editingScenario.cltvAdjustment
                                    : newScenario.cltvAdjustment
                                }
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  if (editingScenario) {
                                    setEditingScenario({
                                      ...editingScenario,
                                      cltvAdjustment: value,
                                    });
                                  } else {
                                    setNewScenario({
                                      ...newScenario,
                                      cltvAdjustment: value,
                                    });
                                  }
                                }}
                              />
                              <span className="ml-2 text-sm font-medium w-14 text-right">
                                {editingScenario
                                  ? (editingScenario.cltvAdjustment > 0
                                      ? "+"
                                      : "") + editingScenario.cltvAdjustment
                                  : (newScenario.cltvAdjustment > 0
                                      ? "+"
                                      : "") + newScenario.cltvAdjustment}
                                %
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Positive values increase CLTV (better), negative
                              values decrease it (worse)
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Conversion Rate Adjustment
                            </label>
                            <div className="flex items-center">
                              <input
                                type="range"
                                min="-25"
                                max="50"
                                step="5"
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                value={
                                  editingScenario
                                    ? editingScenario.conversionAdjustment
                                    : newScenario.conversionAdjustment
                                }
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  if (editingScenario) {
                                    setEditingScenario({
                                      ...editingScenario,
                                      conversionAdjustment: value,
                                    });
                                  } else {
                                    setNewScenario({
                                      ...newScenario,
                                      conversionAdjustment: value,
                                    });
                                  }
                                }}
                              />
                              <span className="ml-2 text-sm font-medium w-14 text-right">
                                {editingScenario
                                  ? (editingScenario.conversionAdjustment > 0
                                      ? "+"
                                      : "") +
                                    editingScenario.conversionAdjustment
                                  : (newScenario.conversionAdjustment > 0
                                      ? "+"
                                      : "") + newScenario.conversionAdjustment}
                                %
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Positive values increase conversion rates
                              (better), negative values decrease them (worse)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Scenario Outcomes
                        </h4>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-xs text-gray-500">ROI</div>
                            <div
                              className={`text-lg font-bold ${
                                (editingScenario
                                  ? editingScenario.metrics.roi
                                  : newScenario.metrics.roi) < 0
                                  ? "text-red-600"
                                  : (editingScenario
                                      ? editingScenario.metrics.roi
                                      : newScenario.metrics.roi) < 50
                                  ? "text-yellow-600"
                                  : "text-green-600"
                              }`}
                            >
                              {(editingScenario
                                ? editingScenario.metrics.roi
                                : newScenario.metrics.roi
                              ).toFixed(1)}
                              %
                            </div>
                          </div>

                          <div>
                            <div className="text-xs text-gray-500">Revenue</div>
                            <div className="text-lg font-bold text-gray-800">
                              $
                              {(editingScenario
                                ? editingScenario.metrics.totalRevenue
                                : newScenario.metrics.totalRevenue
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })}
                            </div>
                          </div>

                          <div>
                            <div className="text-xs text-gray-500">Profit</div>
                            <div
                              className={`text-lg font-bold ${
                                (editingScenario
                                  ? editingScenario.metrics.totalProfit
                                  : newScenario.metrics.totalProfit) < 0
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              $
                              {(editingScenario
                                ? editingScenario.metrics.totalProfit
                                : newScenario.metrics.totalProfit
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })}
                            </div>
                          </div>

                          <div>
                            <div className="text-xs text-gray-500">
                              Break-even
                            </div>
                            <div className="text-lg font-bold text-gray-800">
                              {formatDate(
                                editingScenario
                                  ? editingScenario.metrics.breakEvenPoint
                                  : newScenario.metrics.breakEvenPoint
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center">
                          <div className="flex-1 bg-gray-200 h-2 rounded-full">
                            <div
                              className={`h-full rounded-full ${
                                (editingScenario
                                  ? editingScenario.metrics.roi
                                  : newScenario.metrics.roi) < 0
                                  ? "bg-red-500"
                                  : (editingScenario
                                      ? editingScenario.metrics.roi
                                      : newScenario.metrics.roi) < 50
                                  ? "bg-yellow-500"
                                  : (editingScenario
                                      ? editingScenario.metrics.roi
                                      : newScenario.metrics.roi) < 100
                                  ? "bg-green-500"
                                  : "bg-emerald-500"
                              }`}
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.max(
                                    0,
                                    (editingScenario
                                      ? editingScenario.metrics.roi
                                      : newScenario.metrics.roi) / 2
                                  )
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <div className="ml-4 text-sm font-medium text-gray-700">
                            ROI Performance
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSaveScenario}
                  disabled={
                    editingScenario ? !editingScenario.name : !newScenario.name
                  }
                >
                  {editingScenario ? "Save Changes" : "Create Scenario"}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setEditingScenario(null);
                    setShowNewScenario(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scenario Comparison */}
      {scenarios.length > 1 && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Scenario Comparison Chart
          </h3>

          <div className="h-64 bg-gray-50 border border-gray-200 rounded-lg p-4 relative">
            {/* This would be a proper bar or spider chart in a real implementation */}
            <div className="absolute inset-0 flex items-end justify-around p-8">
              {scenarios.map((scenario, index) => {
                const maxROI = Math.max(...scenarios.map((s) => s.metrics.roi));
                const height = (scenario.metrics.roi / maxROI) * 100;

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
                    key={scenario.name}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-16 ${
                        colors[index % colors.length]
                      } rounded-t-sm`}
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="mt-2 text-xs text-gray-600 truncate w-20 text-center">
                      {scenario.name}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute left-8 top-4 text-sm font-medium text-gray-700">
              ROI Comparison
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioManager;
