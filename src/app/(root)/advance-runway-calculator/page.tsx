// app/page.tsx
"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import GrowthModeling from "@/components/dashboard/GrowthModeling";
// import CapitalEvents from "@/components/dashboard/CapitalEvents";
// import RiskAnalysis from "@/components/dashboard/RiskAnalysis";

import { useRunwayCalculator } from "@/hooks/useRunwayCalculator";
import FinancialParameters from "@/components/FinancialParameter";
import CashFlowChart from "@/components/CashflowChart";
import ProjectionDashboard from "@/components/ProjectionDashboard";
import GrowthModeling from "@/components/GrowthModelling";
import CapitalEvents from "@/components/CapitalEvents";
import RiskAnalysis from "@/components/RiskAnalysis";

export default function AdvancedRunwayCalculator() {
  const {
    financialData,
    growthData,
    capitalEvents,
    projections,
    updateFinancialData,
    updateGrowthData,
    addCapitalEvent,
    runSimulation,
  } = useRunwayCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Advanced Runway Projector
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate your startup's runway with precision using advanced
            financial modeling
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="parameters" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="parameters">
                  Financial Parameters
                </TabsTrigger>
                <TabsTrigger value="growth">Growth Modeling</TabsTrigger>
                <TabsTrigger value="capital">Capital Events</TabsTrigger>
                <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="parameters">
                <FinancialParameters
                  data={financialData}
                  updateData={updateFinancialData}
                />
              </TabsContent>

              <TabsContent value="growth">
                <GrowthModeling
                  data={growthData}
                  updateData={updateGrowthData}
                />
              </TabsContent>

              <TabsContent value="capital">
                <CapitalEvents
                  events={capitalEvents}
                  addEvent={addCapitalEvent}
                />
              </TabsContent>

              <TabsContent value="risk">
                <RiskAnalysis runSimulation={runSimulation} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <ProjectionDashboard projections={projections} />
          </div>
        </div>

        {/* Cash Flow Visualization */}
        <div className="mt-8">
          <CashFlowChart projections={projections} />
        </div>

        {/* Strategic Insights */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Strategic Insights
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Optimal Funding Time:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {projections.optimalFundingTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Critical Cash Point:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {projections.criticalCashPoint}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Profitability Date:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {projections.profitabilityDate}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Runway Extension Options
            </h3>
            <div className="space-y-4">
              {projections.extensionOptions.map((option: any, index: any) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    {option.description}
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {option.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
