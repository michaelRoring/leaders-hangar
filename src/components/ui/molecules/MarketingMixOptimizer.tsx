// src/components/MarketingMixOptimizer.tsx
import React, { useState } from "react";
import {
  MarketingChannel,
  OptimizationRecommendation,
} from "../../../types/marketing-roi";

interface MarketingMixOptimizerProps {
  recommendations: OptimizationRecommendation[];
  channels: MarketingChannel[];
  onApplyRecommendations: (updatedChannels: MarketingChannel[]) => void;
}

const MarketingMixOptimizer: React.FC<MarketingMixOptimizerProps> = ({
  recommendations,
  channels,
  onApplyRecommendations,
}) => {
  const [selectedRecommendations, setSelectedRecommendations] = useState<
    string[]
  >([]);
  const [optimizationLevel, setOptimizationLevel] = useState<
    "conservative" | "moderate" | "aggressive"
  >("moderate");

  const getChannelNameById = (id: string): string => {
    const channel = channels.find((ch) => ch.id === id);
    return channel ? channel.name : "Unknown Channel";
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 80) return "text-green-600";
    if (confidence >= 60) return "text-blue-600";
    return "text-yellow-600";
  };

  const toggleRecommendation = (recommendationId: string) => {
    if (selectedRecommendations.includes(recommendationId)) {
      setSelectedRecommendations(
        selectedRecommendations.filter((id) => id !== recommendationId)
      );
    } else {
      setSelectedRecommendations([
        ...selectedRecommendations,
        recommendationId,
      ]);
    }
  };

  const applySelectedRecommendations = () => {
    // Create a copy of the channels
    const updatedChannels = [...channels];

    // Apply selected recommendations
    selectedRecommendations.forEach((recId) => {
      const recommendation = recommendations.find(
        (rec) => rec.channelId === recId
      );
      if (!recommendation) return;

      // Find the channel and update its budget
      const channelIndex = updatedChannels.findIndex(
        (ch) => ch.id === recommendation.channelId
      );
      if (channelIndex === -1) return;

      const adjustmentFactor =
        optimizationLevel === "conservative"
          ? 0.5
          : optimizationLevel === "aggressive"
          ? 1.0
          : 0.75;

      const currentBudget = updatedChannels[channelIndex].budget;
      const recommendedBudget = recommendation.recommendedBudget;
      const budgetDifference = recommendedBudget - currentBudget;

      updatedChannels[channelIndex].budget =
        currentBudget + budgetDifference * adjustmentFactor;
    });

    // Apply the changes
    onApplyRecommendations(updatedChannels);

    // Clear selected recommendations
    setSelectedRecommendations([]);
  };

  const selectAllRecommendations = () => {
    setSelectedRecommendations(recommendations.map((rec) => rec.channelId));
  };

  const clearAllRecommendations = () => {
    setSelectedRecommendations([]);
  };

  const getTotalROIImprovement = (): number => {
    return selectedRecommendations.reduce((total, recId) => {
      const recommendation = recommendations.find(
        (rec) => rec.channelId === recId
      );
      if (!recommendation) return total;

      const adjustmentFactor =
        optimizationLevel === "conservative"
          ? 0.5
          : optimizationLevel === "aggressive"
          ? 1.0
          : 0.75;

      return total + recommendation.expectedRoiImprovement * adjustmentFactor;
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Marketing Mix Optimizer
        </h2>
        <p className="text-sm text-blue-600">
          Get AI-driven recommendations to optimize your marketing channel
          budget allocation.
        </p>
      </div>

      {/* Optimization Controls */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700">
              Channel Budget Optimization
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Select recommendations to apply and choose your optimization level
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  optimizationLevel === "conservative"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
                onClick={() => setOptimizationLevel("conservative")}
              >
                Conservative
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  optimizationLevel === "moderate"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-gray-300"
                }`}
                onClick={() => setOptimizationLevel("moderate")}
              >
                Moderate
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  optimizationLevel === "aggressive"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
                onClick={() => setOptimizationLevel("aggressive")}
              >
                Aggressive
              </button>
            </div>

            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                selectedRecommendations.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
              onClick={applySelectedRecommendations}
              disabled={selectedRecommendations.length === 0}
            >
              Apply Selected
            </button>
          </div>
        </div>

        {selectedRecommendations.length > 0 && (
          <div className="mt-4 p-3 rounded-md bg-green-50 border border-green-100">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium text-green-800">
                  {selectedRecommendations.length} recommendation
                  {selectedRecommendations.length !== 1 ? "s" : ""} selected
                </span>
                <div className="text-sm text-green-700 mt-1">
                  Estimated ROI improvement:{" "}
                  <span className="font-bold">
                    +{getTotalROIImprovement().toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={selectAllRecommendations}
                >
                  Select All
                </button>
                <button
                  className="text-sm text-red-600 hover:text-red-800"
                  onClick={clearAllRecommendations}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recommendations List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-700">
            Budget Allocation Recommendations
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {recommendations.length > 0 ? (
            recommendations.map((recommendation) => (
              <div
                key={recommendation.channelId}
                className="p-4 hover:bg-gray-50"
              >
                <div className="flex items-start">
                  <div className="h-5 flex items-center">
                    <input
                      id={`recommendation-${recommendation.channelId}`}
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={selectedRecommendations.includes(
                        recommendation.channelId
                      )}
                      onChange={() =>
                        toggleRecommendation(recommendation.channelId)
                      }
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <label
                        htmlFor={`recommendation-${recommendation.channelId}`}
                        className="font-medium text-gray-700 cursor-pointer"
                      >
                        {getChannelNameById(recommendation.channelId)}
                      </label>
                      <div className="flex items-center">
                        <span className="mr-2 text-sm font-medium text-gray-600">
                          Confidence:
                        </span>
                        <span
                          className={`text-sm font-bold ${getConfidenceColor(
                            recommendation.confidence
                          )}`}
                        >
                          {Math.round(recommendation.confidence)}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 text-sm text-gray-600">
                      {recommendation.reasoning}
                    </div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="bg-gray-100 p-2 rounded">
                        <div className="text-xs text-gray-500">
                          Current Budget
                        </div>
                        <div className="font-medium">
                          ${recommendation.currentBudget.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gray-100 p-2 rounded">
                        <div className="text-xs text-gray-500">Recommended</div>
                        <div className="font-medium">
                          ${recommendation.recommendedBudget.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gray-100 p-2 rounded">
                        <div className="text-xs text-gray-500">
                          Expected ROI Boost
                        </div>
                        <div className="font-medium text-green-600">
                          +{recommendation.expectedRoiImprovement.toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-xs text-gray-500 mb-1">
                        Budget Change
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            recommendation.recommendedBudget >
                            recommendation.currentBudget
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${Math.abs(
                              (recommendation.recommendedBudget /
                                recommendation.currentBudget -
                                1) *
                                100
                            )}%`,
                            maxWidth: "100%",
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Current</span>
                        <span>
                          {recommendation.recommendedBudget >
                          recommendation.currentBudget
                            ? `+${(
                                (recommendation.recommendedBudget /
                                  recommendation.currentBudget -
                                  1) *
                                100
                              ).toFixed(0)}%`
                            : `${(
                                (recommendation.recommendedBudget /
                                  recommendation.currentBudget -
                                  1) *
                                100
                              ).toFixed(0)}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">
                No recommendations available at this time. Add more channels or
                adjust your campaign settings.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Optimization Insights */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Optimization Insights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100">
            <h4 className="font-medium text-indigo-800 mb-2">
              Budget Efficiency Analysis
            </h4>
            <p className="text-sm text-indigo-700">
              Your current marketing mix has a few channels that could be
              optimized for better returns. By reallocating budget according to
              our recommendations, you could potentially improve your overall
              ROI by{" "}
              {recommendations
                .reduce((sum, rec) => sum + rec.expectedRoiImprovement, 0)
                .toFixed(1)}
              %.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-md border border-green-100">
            <h4 className="font-medium text-green-800 mb-2">
              Top Performing Channels
            </h4>
            <ul className="text-sm text-green-700 space-y-2">
              {channels
                .filter((ch) => ch.enabled)
                .sort(
                  (a, b) =>
                    (b.averageOrderValue * (b.conversionRate / 100)) / b.cac -
                    (a.averageOrderValue * (a.conversionRate / 100)) / a.cac
                )
                .slice(0, 2)
                .map((channel) => (
                  <li key={channel.id} className="flex justify-between">
                    <span>{channel.name}</span>
                    <span className="font-medium">
                      {(
                        ((channel.averageOrderValue *
                          (channel.conversionRate / 100)) /
                          channel.cac) *
                        100
                      ).toFixed(0)}
                      % ROI
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Additional insights would go here */}
        <div className="mt-4 text-sm text-gray-500">
          <p>
            Optimization levels:
            <span className="font-medium"> Conservative</span> (50% of
            recommended changes),
            <span className="font-medium"> Moderate</span> (75% of recommended
            changes),
            <span className="font-medium"> Aggressive</span> (100% of
            recommended changes)
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketingMixOptimizer;
