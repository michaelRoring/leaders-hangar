// src/types/marketing-roi.ts
export interface MarketingChannel {
  id: string;
  name: string;
  budget: number;
  cac: number; // Customer Acquisition Cost
  conversionRate: number;
  costPerClick: number;
  clickThroughRate: number;
  averageOrderValue: number;
  enabled: boolean;
}

export interface CustomerSegment {
  id: string;
  name: string;
  percentage: number;
  churnRate: number;
  averageOrderValue: number;
  purchaseFrequency: number;
  lifetimeMonths: number;
}

export interface CampaignSettings {
  name: string;
  totalBudget: number;
  startDate: Date;
  endDate: Date;
  targetAudience: string;
  marketingChannels: MarketingChannel[];
  customerSegments: CustomerSegment[];
  overheadCosts: number;
  discountRate: number; // For NPV calculations
  seasonalityFactors: number[];
}

export interface MarketingMetrics {
  cac: number;
  cltv: number;
  cacToCltvRatio: number;
  roi: number;
  breakEvenPoint: Date;
  paybackPeriod: number; // in months
  npv: number; // Net Present Value
  irr: number; // Internal Rate of Return
  totalProfit: number;
  totalRevenue: number;
  marginContribution: number;
  profitabilityDate: Date | null;
}

export interface SensitivityData {
  variable: string;
  baseValue: number;
  range: [number, number];
  step: number;
  impact: number[];
  criticality: "low" | "medium" | "high";
}

export interface ScenarioData {
  name: string;
  description: string;
  budgetAdjustment: number;
  cacAdjustment: number;
  cltvAdjustment: number;
  conversionAdjustment: number;
  metrics: MarketingMetrics;
}

export interface OptimizationRecommendation {
  channelId: string;
  currentBudget: number;
  recommendedBudget: number;
  expectedRoiImprovement: number;
  confidence: number;
  reasoning: string;
}
