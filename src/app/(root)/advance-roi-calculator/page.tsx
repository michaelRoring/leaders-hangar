"use client";
// src/components/ROIMarketingCalculator.tsx
import React, { useState, useEffect } from "react";

import CampaignSettings from "@/components/CampaignSettings";
import ChannelAllocation from "@/components/ChannelAllocation";
import CustomerSegmentManager from "@/components/CustomerSegmentManager";
import ROIProjections from "@/components/ROIProjections";
import SensitivityAnalysis from "@/components/SensitivityAnalysis";
import MarketingMixOptimizer from "@/components/MarketingMixOptimizer";
import VisualizationDashboard from "@/components/VisualizationDashboard";
import ScenarioManager from "@/components/ScenarioManager";

import {
  CampaignSettings as CampaignSettingsType,
  MarketingChannel,
  CustomerSegment,
  MarketingMetrics,
  SensitivityData,
  ScenarioData,
  OptimizationRecommendation,
} from "@/types/marketing-roi";

// Initial default data
const defaultChannels: MarketingChannel[] = [
  {
    id: "ch1",
    name: "Paid Search",
    budget: 5000,
    cac: 40,
    conversionRate: 2.5,
    costPerClick: 1.2,
    clickThroughRate: 3.1,
    averageOrderValue: 120,
    enabled: true,
  },
  {
    id: "ch2",
    name: "Social Media",
    budget: 4000,
    cac: 35,
    conversionRate: 1.8,
    costPerClick: 0.8,
    clickThroughRate: 2.5,
    averageOrderValue: 95,
    enabled: true,
  },
  {
    id: "ch3",
    name: "Content Marketing",
    budget: 3000,
    cac: 55,
    conversionRate: 1.2,
    costPerClick: 0,
    clickThroughRate: 1.9,
    averageOrderValue: 135,
    enabled: true,
  },
  {
    id: "ch4",
    name: "Email Marketing",
    budget: 2000,
    cac: 15,
    conversionRate: 3.2,
    costPerClick: 0,
    clickThroughRate: 4.5,
    averageOrderValue: 85,
    enabled: true,
  },
  {
    id: "ch5",
    name: "Display Ads",
    budget: 2500,
    cac: 60,
    conversionRate: 0.9,
    costPerClick: 0.5,
    clickThroughRate: 0.7,
    averageOrderValue: 110,
    enabled: true,
  },
];

const defaultSegments: CustomerSegment[] = [
  {
    id: "seg1",
    name: "High Value",
    percentage: 20,
    churnRate: 5,
    averageOrderValue: 200,
    purchaseFrequency: 6,
    lifetimeMonths: 24,
  },
  {
    id: "seg2",
    name: "Mid Value",
    percentage: 50,
    churnRate: 15,
    averageOrderValue: 100,
    purchaseFrequency: 4,
    lifetimeMonths: 18,
  },
  {
    id: "seg3",
    name: "Low Value",
    percentage: 30,
    churnRate: 25,
    averageOrderValue: 50,
    purchaseFrequency: 2,
    lifetimeMonths: 12,
  },
];

const defaultCampaignSettings: CampaignSettingsType = {
  name: "Q1 Growth Campaign",
  totalBudget: 16500,
  startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 3, 0),
  targetAudience: "Small Business Owners",
  marketingChannels: defaultChannels,
  customerSegments: defaultSegments,
  overheadCosts: 2000,
  discountRate: 8,
  seasonalityFactors: [
    1.0, 1.1, 1.2, 0.9, 0.8, 0.7, 0.9, 1.0, 1.1, 1.3, 1.4, 0.9,
  ],
};

const ROIMarketingCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("campaign");
  const [campaignSettings, setCampaignSettings] =
    useState<CampaignSettingsType>(defaultCampaignSettings);
  const [metrics, setMetrics] = useState<MarketingMetrics>({
    cac: 0,
    cltv: 0,
    cacToCltvRatio: 0,
    roi: 0,
    breakEvenPoint: new Date(),
    paybackPeriod: 0,
    npv: 0,
    irr: 0,
    totalProfit: 0,
    totalRevenue: 0,
    marginContribution: 0,
    profitabilityDate: null,
  });
  const [sensitivityData, setSensitivityData] = useState<SensitivityData[]>([]);
  const [scenarios, setScenarios] = useState<ScenarioData[]>([]);
  const [recommendations, setRecommendations] = useState<
    OptimizationRecommendation[]
  >([]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Calculate ROI metrics whenever campaign settings change
  useEffect(() => {
    calculateROI();
  }, [campaignSettings]);

  const calculateROI = () => {
    setIsCalculating(true);

    // Simulate async calculation process
    setTimeout(() => {
      // Calculate weighted CAC based on channel allocation
      const totalBudget = campaignSettings.marketingChannels.reduce(
        (sum, channel) => (channel.enabled ? sum + channel.budget : sum),
        0
      );

      const weightedCAC = campaignSettings.marketingChannels.reduce(
        (acc, channel) =>
          channel.enabled
            ? acc + channel.cac * (channel.budget / totalBudget)
            : acc,
        0
      );

      // Calculate weighted CLTV based on customer segments
      const weightedCLTV = campaignSettings.customerSegments.reduce(
        (acc, segment) => {
          const segmentCLTV =
            segment.averageOrderValue *
            segment.purchaseFrequency *
            (segment.lifetimeMonths / 12) *
            (1 - segment.churnRate / 100);
          return acc + segmentCLTV * (segment.percentage / 100);
        },
        0
      );

      // Calculate total customers acquired
      const totalCustomers = campaignSettings.marketingChannels.reduce(
        (acc, channel) => {
          if (!channel.enabled) return acc;
          const visitors =
            (channel.budget / channel.costPerClick) *
            (channel.clickThroughRate / 100);
          const customers = visitors * (channel.conversionRate / 100);
          return acc + customers;
        },
        0
      );

      // Calculate revenue and profit
      const totalRevenue = totalCustomers * weightedCLTV;
      const totalCost = totalBudget + campaignSettings.overheadCosts;
      const totalProfit = totalRevenue - totalCost;

      // Calculate ROI percentage
      const roi = (totalProfit / totalCost) * 100;

      // Calculate break-even date
      const dailyProfit =
        totalProfit /
        ((campaignSettings.endDate.getTime() -
          campaignSettings.startDate.getTime()) /
          (1000 * 60 * 60 * 24));
      const daysToBreakEven = totalCost / dailyProfit;

      const breakEvenDate = new Date(campaignSettings.startDate);
      breakEvenDate.setDate(breakEvenDate.getDate() + daysToBreakEven);

      // Calculate NPV with the discount rate
      const monthlyRate = campaignSettings.discountRate / 12 / 100;
      const npv =
        -totalCost +
        totalRevenue /
          Math.pow(
            1 + monthlyRate,
            (campaignSettings.endDate.getTime() -
              campaignSettings.startDate.getTime()) /
              (1000 * 60 * 60 * 24 * 30)
          );

      // Set calculated metrics
      setMetrics({
        cac: weightedCAC,
        cltv: weightedCLTV,
        cacToCltvRatio: weightedCLTV / weightedCAC,
        roi: roi,
        breakEvenPoint: breakEvenDate,
        paybackPeriod: daysToBreakEven / 30, // Convert to months
        npv: npv,
        irr: roi / 2, // Simplified IRR estimation for this example
        totalProfit: totalProfit,
        totalRevenue: totalRevenue,
        marginContribution: (totalProfit / totalRevenue) * 100,
        profitabilityDate: new Date(),
      });

      // Generate sensitivity data
      generateSensitivityData(weightedCAC, weightedCLTV, roi);

      // Generate scenarios
      generateScenarios(
        weightedCAC,
        weightedCLTV,
        roi,
        totalProfit,
        totalRevenue
      );

      // Generate optimization recommendations
      generateRecommendations();

      setIsCalculating(false);
    }, 1000);
  };

  const generateSensitivityData = (cac: number, cltv: number, roi: number) => {
    const sensitivityVariables: SensitivityData[] = [
      {
        variable: "CAC",
        baseValue: cac,
        range: [cac * 0.5, cac * 1.5],
        step: cac * 0.1,
        impact: Array.from({ length: 11 }, (_, i) => {
          const adjustedCAC = cac * (0.5 + i * 0.1);
          const adjustedRatio = cltv / adjustedCAC;
          return (adjustedRatio / (cltv / cac) - 1) * 100;
        }),
        criticality: "high",
      },
      {
        variable: "CLTV",
        baseValue: cltv,
        range: [cltv * 0.5, cltv * 1.5],
        step: cltv * 0.1,
        impact: Array.from({ length: 11 }, (_, i) => {
          const adjustedCLTV = cltv * (0.5 + i * 0.1);
          const adjustedRatio = adjustedCLTV / cac;
          return (adjustedRatio / (cltv / cac) - 1) * 100;
        }),
        criticality: "high",
      },
      {
        variable: "Conversion Rate",
        baseValue: campaignSettings.marketingChannels.reduce(
          (sum, ch) =>
            sum +
            ch.conversionRate * (ch.budget / campaignSettings.totalBudget),
          0
        ),
        range: [0.5, 5],
        step: 0.5,
        impact: Array.from({ length: 10 }, (_, i) => (i - 4) * 15),
        criticality: "medium",
      },
      {
        variable: "Churn Rate",
        baseValue: campaignSettings.customerSegments.reduce(
          (sum, seg) => sum + seg.churnRate * (seg.percentage / 100),
          0
        ),
        range: [5, 35],
        step: 3,
        impact: Array.from({ length: 11 }, (_, i) => -i * 8),
        criticality: "medium",
      },
      {
        variable: "Average Order Value",
        baseValue: campaignSettings.customerSegments.reduce(
          (sum, seg) => sum + seg.averageOrderValue * (seg.percentage / 100),
          0
        ),
        range: [50, 250],
        step: 20,
        impact: Array.from({ length: 11 }, (_, i) => (i - 5) * 12),
        criticality: "medium",
      },
    ];

    setSensitivityData(sensitivityVariables);
  };

  const generateScenarios = (
    cac: number,
    cltv: number,
    roi: number,
    profit: number,
    revenue: number
  ) => {
    const scenariosList: ScenarioData[] = [
      {
        name: "Base Case",
        description: "Current projections without adjustments",
        budgetAdjustment: 0,
        cacAdjustment: 0,
        cltvAdjustment: 0,
        conversionAdjustment: 0,
        metrics: { ...metrics },
      },
      {
        name: "Optimistic",
        description: "Lower CAC, higher conversion rates",
        budgetAdjustment: 5,
        cacAdjustment: -15,
        cltvAdjustment: 10,
        conversionAdjustment: 20,
        metrics: {
          ...metrics,
          cac: cac * 0.85,
          cltv: cltv * 1.1,
          roi: roi * 1.4,
          totalProfit: profit * 1.4,
          totalRevenue: revenue * 1.2,
        },
      },
      {
        name: "Conservative",
        description: "Higher CAC, lower conversion rates",
        budgetAdjustment: 0,
        cacAdjustment: 15,
        cltvAdjustment: -5,
        conversionAdjustment: -10,
        metrics: {
          ...metrics,
          cac: cac * 1.15,
          cltv: cltv * 0.95,
          roi: roi * 0.7,
          totalProfit: profit * 0.7,
          totalRevenue: revenue * 0.9,
        },
      },
      {
        name: "Aggressive Growth",
        description: "Higher budget, focus on acquisition",
        budgetAdjustment: 25,
        cacAdjustment: 10,
        cltvAdjustment: 0,
        conversionAdjustment: 5,
        metrics: {
          ...metrics,
          cac: cac * 1.1,
          cltv: cltv,
          roi: roi * 0.9,
          totalProfit: profit * 1.1,
          totalRevenue: revenue * 1.25,
        },
      },
      {
        name: "Efficiency Focus",
        description: "Lower budget, focus on high-converting channels",
        budgetAdjustment: -20,
        cacAdjustment: -5,
        cltvAdjustment: 5,
        conversionAdjustment: 10,
        metrics: {
          ...metrics,
          cac: cac * 0.95,
          cltv: cltv * 1.05,
          roi: roi * 1.2,
          totalProfit: profit * 0.95,
          totalRevenue: revenue * 0.85,
        },
      },
    ];

    setScenarios(scenariosList);
  };

  const generateRecommendations = () => {
    // Analyze channels and make budget allocation recommendations
    const channelRecommendations: OptimizationRecommendation[] =
      campaignSettings.marketingChannels
        .filter((channel) => channel.enabled)
        .map((channel) => {
          const efficiency =
            (channel.averageOrderValue * (channel.conversionRate / 100)) /
            channel.cac;
          const currentAllocation =
            channel.budget / campaignSettings.totalBudget;

          // Simplified recommendation algorithm
          let recommendedBudget = channel.budget;
          let reasoning = "";
          let expectedImprovement = 0;

          if (efficiency > 1.2) {
            // High efficiency channel
            recommendedBudget = channel.budget * 1.2;
            reasoning = "High efficiency channel, increase budget allocation";
            expectedImprovement = 8 + Math.random() * 7;
          } else if (efficiency < 0.8) {
            // Low efficiency channel
            recommendedBudget = channel.budget * 0.8;
            reasoning = "Low efficiency channel, decrease budget allocation";
            expectedImprovement = 3 + Math.random() * 5;
          } else {
            // Medium efficiency
            recommendedBudget = channel.budget;
            reasoning = "Maintain current budget allocation";
            expectedImprovement = 0;
          }

          return {
            channelId: channel.id,
            currentBudget: channel.budget,
            recommendedBudget: recommendedBudget,
            expectedRoiImprovement: expectedImprovement,
            confidence: 65 + Math.random() * 25,
            reasoning,
          };
        })
        .sort((a, b) => b.expectedRoiImprovement - a.expectedRoiImprovement);

    setRecommendations(channelRecommendations);
  };

  const handleChannelChange = (channels: MarketingChannel[]) => {
    setCampaignSettings({
      ...campaignSettings,
      marketingChannels: channels,
      totalBudget: channels.reduce(
        (sum, ch) => sum + (ch.enabled ? ch.budget : 0),
        0
      ),
    });
  };

  const handleSegmentChange = (segments: CustomerSegment[]) => {
    setCampaignSettings({
      ...campaignSettings,
      customerSegments: segments,
    });
  };

  const handleSettingsChange = (settings: Partial<CampaignSettingsType>) => {
    setCampaignSettings({
      ...campaignSettings,
      ...settings,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl max-w-7xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8">
        <h1 className="text-3xl font-bold text-white">
          Advanced Marketing ROI Calculator
        </h1>
        <p className="text-blue-100 mt-2">
          Maximize your marketing investment with data-driven insights and
          multi-scenario analysis
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-100 border-b border-gray-200">
        <nav className="flex px-6">
          {[
            "campaign",
            "channels",
            "segments",
            "projections",
            "sensitivity",
            "optimization",
            "visualizations",
          ].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 font-medium text-sm uppercase tracking-wider ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                  : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {isCalculating && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="loader mb-4 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-700">Calculating ROI projections...</p>
            </div>
          </div>
        )}

        {activeTab === "campaign" && (
          <CampaignSettings
            settings={campaignSettings}
            onChange={handleSettingsChange}
          />
        )}

        {activeTab === "channels" && (
          <ChannelAllocation
            channels={campaignSettings.marketingChannels}
            onChange={handleChannelChange}
          />
        )}

        {activeTab === "segments" && (
          <CustomerSegmentManager
            segments={campaignSettings.customerSegments}
            onChange={handleSegmentChange}
          />
        )}

        {activeTab === "projections" && (
          <ROIProjections metrics={metrics} scenarios={scenarios} />
        )}

        {activeTab === "sensitivity" && (
          <SensitivityAnalysis data={sensitivityData} />
        )}

        {activeTab === "optimization" && (
          <MarketingMixOptimizer
            recommendations={recommendations}
            channels={campaignSettings.marketingChannels}
            onApplyRecommendations={(updatedChannels) =>
              handleChannelChange(updatedChannels)
            }
          />
        )}

        {activeTab === "visualizations" && (
          <VisualizationDashboard
            metrics={metrics}
            channels={campaignSettings.marketingChannels}
            segments={campaignSettings.customerSegments}
            scenarios={scenarios}
          />
        )}
      </div>

      {/* Dashboard Summary */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500 uppercase tracking-wider">
              Total Revenue
            </div>
            <div className="mt-1 text-2xl font-semibold text-gray-800">
              ${Math.round(metrics.totalRevenue).toLocaleString()}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500 uppercase tracking-wider">
              Total Profit
            </div>
            <div className="mt-1 text-2xl font-semibold text-gray-800">
              ${Math.round(metrics.totalProfit).toLocaleString()}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500 uppercase tracking-wider">
              ROI
            </div>
            <div className="mt-1 text-2xl font-semibold text-gray-800">
              {Math.round(metrics.roi)}%
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500 uppercase tracking-wider">
              Break-even
            </div>
            <div className="mt-1 text-2xl font-semibold text-gray-800">
              {metrics.breakEvenPoint.toLocaleDateString("en-US", {
                month: "short",
                year: "2-digit",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROIMarketingCalculator;
