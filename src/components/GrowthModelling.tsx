// components/dashboard/GrowthModeling.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface GrowthModelingProps {
  data: {
    scenario: string;
    seasonality: {
      q1: number;
      q2: number;
      q3: number;
      q4: number;
    };
    marketDependency: {
      marketSize: number;
      competition: number;
      economicCycle: number;
    };
  };
  updateData: (data: any) => void;
}

export default function GrowthModeling({
  data,
  updateData,
}: GrowthModelingProps) {
  const handleScenarioChange = (value: string) => {
    updateData({
      ...data,
      scenario: value,
    });
  };

  const handleSeasonalityChange = (quarter: string, value: string) => {
    const numValue = parseFloat(value);
    updateData({
      ...data,
      seasonality: {
        ...data.seasonality,
        [quarter]: isNaN(numValue) ? 0 : numValue,
      },
    });
  };

  const handleSliderChange = (field: string, value: number) => {
    updateData({
      ...data,
      marketDependency: {
        ...data.marketDependency,
        [field]: value,
      },
    });
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-600">
        <CardTitle className="text-white">Market & Growth Modeling</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                Growth Scenario Selection
              </h3>
              <RadioGroup
                value={data.scenario}
                onValueChange={handleScenarioChange}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
                  <RadioGroupItem value="conservative" id="conservative" />
                  <Label htmlFor="conservative" className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Conservative (3%)
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Low-risk projections for minimal growth
                    </span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
                  <RadioGroupItem value="base" id="base" />
                  <Label htmlFor="base" className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Base Case (8%)
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Moderate expansion matching market trends
                    </span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive" className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Aggressive (12%)
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      High-growth projections for rapid scaling
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                Seasonality Factors
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="q1"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Q1 Adjustment
                  </Label>
                  <div className="relative rounded-md shadow-sm">
                    <Input
                      id="q1"
                      type="number"
                      step="0.01"
                      value={data.seasonality.q1}
                      onChange={(e) =>
                        handleSeasonalityChange("q1", e.target.value)
                      }
                      className="pr-12 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                        factor
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="q2"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Q2 Adjustment
                  </Label>
                  <div className="relative rounded-md shadow-sm">
                    <Input
                      id="q2"
                      type="number"
                      step="0.01"
                      value={data.seasonality.q2}
                      onChange={(e) =>
                        handleSeasonalityChange("q2", e.target.value)
                      }
                      className="pr-12 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                        factor
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="q3"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Q3 Adjustment
                  </Label>
                  <div className="relative rounded-md shadow-sm">
                    <Input
                      id="q3"
                      type="number"
                      step="0.01"
                      value={data.seasonality.q3}
                      onChange={(e) =>
                        handleSeasonalityChange("q3", e.target.value)
                      }
                      className="pr-12 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                        factor
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="q4"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Q4 Adjustment
                  </Label>
                  <div className="relative rounded-md shadow-sm">
                    <Input
                      id="q4"
                      type="number"
                      step="0.01"
                      value={data.seasonality.q4}
                      onChange={(e) =>
                        handleSeasonalityChange("q4", e.target.value)
                      }
                      className="pr-12 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                        factor
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
              Market Dependency
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label
                    htmlFor="marketSize"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Market Size Impact
                  </Label>
                  <span
                    className={`text-sm font-medium px-2 py-0.5 rounded ${
                      data.marketDependency.marketSize > 0.65
                        ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                        : data.marketDependency.marketSize > 0.35
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                    }`}
                  >
                    {data.marketDependency.marketSize > 0.65
                      ? "High"
                      : data.marketDependency.marketSize > 0.35
                      ? "Medium"
                      : "Low"}
                  </span>
                </div>
                <Slider
                  id="marketSize"
                  min={0}
                  max={1}
                  step={0.01}
                  value={[data.marketDependency.marketSize]}
                  onValueChange={(vals: any) =>
                    handleSliderChange("marketSize", vals[0])
                  }
                  className="my-2"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Low Dependency</span>
                  <span>High Dependency</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label
                    htmlFor="competition"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Competition Factor
                  </Label>
                  <span
                    className={`text-sm font-medium px-2 py-0.5 rounded ${
                      data.marketDependency.competition > 0.65
                        ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                        : data.marketDependency.competition > 0.35
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                    }`}
                  >
                    {data.marketDependency.competition > 0.65
                      ? "High"
                      : data.marketDependency.competition > 0.35
                      ? "Medium"
                      : "Low"}
                  </span>
                </div>
                <Slider
                  id="competition"
                  min={0}
                  max={1}
                  step={0.01}
                  value={[data.marketDependency.competition]}
                  onValueChange={(vals: any) =>
                    handleSliderChange("competition", vals[0])
                  }
                  className="my-2"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Low Impact</span>
                  <span>High Impact</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label
                    htmlFor="economicCycle"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Economic Cycle
                  </Label>
                  <span
                    className={`text-sm font-medium px-2 py-0.5 rounded ${
                      data.marketDependency.economicCycle > 0.65
                        ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                        : data.marketDependency.economicCycle > 0.35
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                    }`}
                  >
                    {data.marketDependency.economicCycle > 0.65
                      ? "High"
                      : data.marketDependency.economicCycle > 0.35
                      ? "Medium"
                      : "Low"}
                  </span>
                </div>
                <Slider
                  id="economicCycle"
                  min={0}
                  max={1}
                  step={0.01}
                  value={[data.marketDependency.economicCycle]}
                  onValueChange={(vals: any) =>
                    handleSliderChange("economicCycle", vals[0])
                  }
                  className="my-2"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Recession Proof</span>
                  <span>Highly Cyclical</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
