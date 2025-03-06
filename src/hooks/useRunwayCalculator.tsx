// hooks/useRunwayCalculator.ts
import { useState, useEffect } from "react";

interface CapitalEvent {
  id: string;
  type: string;
  amount: number;
  date: string;
  details: string;
}

export function useRunwayCalculator() {
  const [financialData, setFinancialData] = useState({
    revenue: {
      primary: 25000,
      secondary: 7500,
      other: 2300,
    },
    expenses: {
      fixed: 18700,
      variable: 8400,
      capex: 5000,
    },
    cashReserves: {
      operating: 120000,
      emergency: 50000,
      restricted: 30000,
    },
  });

  const [growthData, setGrowthData] = useState({
    scenario: "base",
    seasonality: {
      q1: -0.05,
      q2: 0.1,
      q3: 0.15,
      q4: 0.25,
    },
    marketDependency: {
      marketSize: 0.6,
      competition: 0.4,
      economicCycle: 0.3,
    },
  });

  const [capitalEvents, setCapitalEvents] = useState<CapitalEvent[]>([
    {
      id: "1",
      type: "funding",
      amount: 500000,
      date: "2024-05-15",
      details: "Round A",
    },
  ]);

  const [projections, setProjections] = useState({
    burnRate: 7300,
    runway: 12,
    cashOutDate: "Apr 2026",
    optimalFundingTime: "Aug 2025",
    criticalCashPoint: "Jan 2026",
    profitabilityDate: "Sep 2026",
    timeline: [
      "Q1 2024",
      "Q2 2024",
      "Q3 2024",
      "Q4 2024",
      "Q1 2025",
      "Q2 2025",
      "Q3 2025",
      "Q4 2025",
      "Q1 2026",
      "Q2 2026",
      "Q3 2026",
      "Q4 2026",
    ],
    cashFlow: {
      conservative: [
        140000, 130000, 120000, 110000, 100000, 90000, 80000, 70000, 60000,
        50000, 40000, 30000,
      ],
      baseCase: [
        140000, 145000, 150000, 145000, 140000, 135000, 130000, 125000, 120000,
        115000, 110000, 105000,
      ],
      optimistic: [
        140000, 155000, 170000, 185000, 180000, 175000, 170000, 165000, 160000,
        155000, 150000, 145000,
      ],
    },
    survivalProbability: {
      "90": 9,
      "75": 12,
      "50": 15,
      "25": 18,
      "10": 21,
    },
    currentCashFlow: {
      amount: 210000,
      endDate: "Apr 2026",
    },
    extensionOptions: [
      { description: "Reduce variable expenses:", impact: "+3mo" },
      { description: "15% revenue increase:", impact: "+5mo" },
      { description: "Funding round ($750k):", impact: "+14mo" },
    ],
  });

  // Function to update financial data
  const updateFinancialData = (newData: any) => {
    setFinancialData(newData);
    recalculateProjections();
  };

  // Function to update growth data
  const updateGrowthData = (newData: any) => {
    setGrowthData(newData);
    recalculateProjections();
  };

  // Function to add capital event
  //   const addCapitalEvent = (event: any) => {
  //     setCapitalEvents([
  //       ...capitalEvents,
  //       { ...event, id: Date.now().toString() },
  //     ]);
  //     recalculateProjections();
  //   };

  // Function to run Monte Carlo simulation
  const runSimulation = (iterations = 1000) => {
    console.log(`Running simulation with ${iterations} iterations`);
    // Simplified version - would include actual Monte Carlo simulation
    recalculateProjections();
  };

  const addCapitalEvent = (event: Omit<CapitalEvent, "id">) => {
    setCapitalEvents([
      ...capitalEvents,
      { ...event, id: Date.now().toString() },
    ]);
    recalculateProjections();
  };

  // Function to recalculate projections when inputs change
  const recalculateProjections = () => {
    // In a real implementation, this would contain complex financial modeling
    // This is a simplified version for demonstration purposes

    // Calculate total monthly revenue
    const totalRevenue =
      financialData.revenue.primary +
      financialData.revenue.secondary +
      financialData.revenue.other;

    // Calculate total monthly expenses
    const totalExpenses =
      financialData.expenses.fixed +
      financialData.expenses.variable +
      financialData.expenses.capex / 3; // Convert quarterly to monthly

    // Calculate burn rate
    const burnRate = Math.max(0, totalExpenses - totalRevenue);

    // Calculate total cash available
    const totalCash =
      financialData.cashReserves.operating +
      financialData.cashReserves.emergency;

    // Calculate runway in months
    const runwayMonths = totalCash / burnRate;

    // Update projections
    setProjections((prev) => ({
      ...prev,
      burnRate: Math.round(burnRate),
      runway: Math.round(runwayMonths),
      // Other calculations would be more complex in a real implementation
    }));
  };

  // Initial calculation
  useEffect(() => {
    recalculateProjections();
  }, []);

  return {
    financialData,
    growthData,
    capitalEvents,
    projections,
    updateFinancialData,
    updateGrowthData,
    addCapitalEvent,
    runSimulation,
  };
}
