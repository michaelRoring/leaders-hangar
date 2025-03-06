// src/types/index.ts

export interface FinancialDataType {
  revenueStreams: {
    primary: number;
    secondary: number;
    other: number;
  };
  expenseCategories: {
    fixed: number;
    variable: number;
    capex: number;
  };
  cashReserves: {
    operating: number;
    emergency: number;
    restricted: number;
  };
}

export interface GrowthModelType {
  scenario: "conservative" | "base" | "aggressive";
  rates: {
    conservative: number;
    base: number;
    aggressive: number;
  };
  seasonality: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
  };
  marketDependency: {
    marketSizeImpact: number;
    competitionFactor: number;
    economicCycle: number;
  };
}

export interface CapitalEventType {
  type: "funding" | "debt";
  name: string;
  amount: number;
  date?: string;
  interestRate?: number;
  terms?: Record<string, any>;
  drawSchedule?: Record<string, any>;
}

export interface ProjectionsType {
  burnRate: number;
  runway: number;
  cashOutDate: Date;
  optimalFundingTime: Date;
  criticalCashPoint: Date;
  profitabilityDate: Date;
  survivalProbability: {
    ninety: number;
    seventyFive: number;
    fifty: number;
    twentyFive: number;
    ten: number;
  };
  runwayExtensionOptions: {
    reduceVariableExpenses: number;
    increaseRevenue: number;
    fundingRound: number;
  };
  cashReserves?: {
    total: number;
  };
}

export interface RunwayCalculatorData {
  currentCash: number;
  burnRate: number;
  revenueGrowthRate: number;
  expenseGrowthRate: number;
  fundInjection: {
    amount: number;
    date: Date;
  };
  lowCashWarningDate: Date;
  projectedRunwayDate: Date;
}
