// components/dashboard/RiskAnalysis.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Slider } from "@/components/ui/shadcn/slider";
import { Label } from "@/components/ui/shadcn/label";
import { Input } from "@/components/ui/shadcn/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import {
  HelpCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shadcn/tooltip";

interface RiskAnalysisProps {
  runSimulation: (iterations?: number) => void;
}

export default function RiskAnalysis({ runSimulation }: RiskAnalysisProps) {
  const [iterations, setIterations] = useState(1000);
  const [sensitivityLevel, setSensitivityLevel] = useState(0.25);
  const [isSimulating, setIsSimulating] = useState(false);
  const [variabilityFactors, setVariabilityFactors] = useState({
    revenue: 0.2,
    expenses: 0.15,
    growth: 0.3,
  });

  const handleRunSimulation = () => {
    setIsSimulating(true);

    // Simulate API delay
    setTimeout(() => {
      runSimulation(iterations);
      setIsSimulating(false);
    }, 1500);
  };

  const handleVariabilityChange = (factor: string, value: number) => {
    setVariabilityFactors({
      ...variabilityFactors,
      [factor]: value,
    });
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-rose-500 to-red-600">
        <CardTitle className="text-white">Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Sensitivity: High Impact Variables
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      These variables have the highest impact on your runway
                      calculation
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mb-5">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      These variables have the highest impact on your runway
                      forecast based on sensitivity analysis. Pay close
                      attention to these metrics.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Customer Acquisition Cost
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Impacts marketing expenses and growth trajectory
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Churn Rate
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Directly affects recurring revenue stability
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Fixed Operational Expenses
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Base burn rate determining minimum runway
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                Variability Factors
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label
                      htmlFor="revenue-variability"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Revenue Volatility
                    </Label>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {Math.round(variabilityFactors.revenue * 100)}%
                    </span>
                  </div>
                  <Slider
                    id="revenue-variability"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[variabilityFactors.revenue]}
                    onValueChange={(vals: any) =>
                      handleVariabilityChange("revenue", vals[0])
                    }
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label
                      htmlFor="expenses-variability"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Expense Volatility
                    </Label>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {Math.round(variabilityFactors.expenses * 100)}%
                    </span>
                  </div>
                  <Slider
                    id="expenses-variability"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[variabilityFactors.expenses]}
                    onValueChange={(vals: any) =>
                      handleVariabilityChange("expenses", vals[0])
                    }
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label
                      htmlFor="growth-variability"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Growth Rate Volatility
                    </Label>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {Math.round(variabilityFactors.growth * 100)}%
                    </span>
                  </div>
                  <Slider
                    id="growth-variability"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[variabilityFactors.growth]}
                    onValueChange={(vals: any) =>
                      handleVariabilityChange("growth", vals[0])
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                Monte Carlo Simulation
              </h3>
              <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-violet-800 dark:text-violet-300">
                      Monte Carlo simulation runs multiple scenarios with random
                      variations to show the probability distribution of
                      possible outcomes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="iterations"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Number of Iterations
                  </Label>
                  <Select
                    value={iterations.toString()}
                    onValueChange={(value) => setIterations(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select iterations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="100">
                          100 iterations (quick)
                        </SelectItem>
                        <SelectItem value="500">500 iterations</SelectItem>
                        <SelectItem value="1000">
                          1000 iterations (recommended)
                        </SelectItem>
                        <SelectItem value="5000">
                          5000 iterations (detailed)
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="sensitivity"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Sensitivity Level
                  </Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Slider
                        id="sensitivity"
                        min={0.1}
                        max={0.5}
                        step={0.05}
                        value={[sensitivityLevel]}
                        onValueChange={(vals: any) =>
                          setSensitivityLevel(vals[0])
                        }
                      />
                    </div>
                    <div className="w-16 text-right">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {Math.round(sensitivityLevel * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Conservative</span>
                    <span>Aggressive</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                    size="lg"
                    onClick={handleRunSimulation}
                    disabled={isSimulating}
                  >
                    {isSimulating ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Running Simulation...
                      </>
                    ) : (
                      <>Run Simulation</>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                Risk Mitigation Suggestions
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Diversify Revenue Streams
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add secondary revenue sources to reduce dependency on
                    primary channel
                  </p>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Optimize CAC Efficiency
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Focus on channels with lower customer acquisition costs and
                    higher LTV
                  </p>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Convertible Debt Bridge
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Consider raising convertible notes before hitting critical
                    cash threshold
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
