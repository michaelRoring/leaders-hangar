// components/dashboard/FinancialParameters.tsx
import { Input } from "@/components/ui/shadcn/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";

interface FinancialParametersProps {
  data: {
    revenue: {
      primary: number;
      secondary: number;
      other: number;
    };
    expenses: {
      fixed: number;
      variable: number;
      capex: number;
    };
    cashReserves: {
      operating: number;
      emergency: number;
      restricted: number;
    };
  };
  updateData: (data: any) => void;
}

export default function FinancialParameters({
  data,
  updateData,
}: FinancialParametersProps) {
  const handleInputChange = (
    category: string,
    field: string,
    value: string
  ) => {
    const numValue = parseFloat(value) || 0;
    updateData({
      ...data,
      [category]: {
        ...data[category as keyof typeof data],
        [field]: numValue,
      },
    });
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600">
        <CardTitle className="text-white">Financial Parameters</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
              Revenue Streams
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Primary
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                      $
                    </span>
                  </div>
                  <Input
                    type="number"
                    value={data.revenue.primary}
                    onChange={(e) =>
                      handleInputChange("revenue", "primary", e.target.value)
                    }
                    className="pl-8 pr-12 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                      /mo
                    </span>
                  </div>
                </div>
              </div>

              {/* Similar structure for other revenue inputs */}
              {/* ... */}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
              Expense Categories
            </h3>
            {/* Expense inputs similar to revenue structure */}
            {/* ... */}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
              Cash Reserves
            </h3>
            {/* Cash reserve inputs */}
            {/* ... */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
