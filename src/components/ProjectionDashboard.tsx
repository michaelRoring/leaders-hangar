// components/dashboard/ProjectionDashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProjectionDashboardProps {
  projections: {
    burnRate: number;
    runway: number;
    cashOutDate: string;
    survivalProbability: {
      "90": number;
      "75": number;
      "50": number;
      "25": number;
      "10": number;
    };
    currentCashFlow: {
      amount: number;
      endDate: string;
    };
  };
}

export default function ProjectionDashboard({
  projections,
}: ProjectionDashboardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl h-full">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-800 rounded-t-xl">
        <CardTitle className="text-white">Projection Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
              Current Metrics
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Burn Rate:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ${projections.burnRate.toLocaleString()}/mo
                  </span>
                </div>
                <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (projections.burnRate / 10000) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Runway:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {projections.runway} months
                  </span>
                </div>
                <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (projections.runway / 24) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Cash-out Date:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {projections.cashOutDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
              Survival Probability
            </h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    90%
                  </span>
                  <Progress
                    value={90}
                    className="h-2 w-2/3"
                    // variant="success"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {projections.survivalProbability["90"]}mo
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    75%
                  </span>
                  {/* <Progress value={75} className="h-2 w-2/3" variant="info" /> */}
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {projections.survivalProbability["75"]}mo
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    50%
                  </span>
                  <Progress
                    value={50}
                    className="h-2 w-2/3"
                    // variant="warning"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {projections.survivalProbability["50"]}mo
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    25%
                  </span>
                  <Progress
                    value={25}
                    className="h-2 w-2/3"
                    // variant="warning"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {projections.survivalProbability["25"]}mo
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    10%
                  </span>
                  {/* <Progress value={10} className="h-2 w-2/3" variant="danger" /> */}
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {projections.survivalProbability["10"]}mo
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
              Current Cash Flow
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                ${projections.currentCashFlow.amount.toLocaleString()}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Today</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {projections.currentCashFlow.endDate}
                </span>
              </div>
              <div className="mt-2">
                {/* <Progress value={100} className="h-1.5" variant="info" /> */}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
