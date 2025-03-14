// src/components/FinancialParameters.tsx
import React from "react";
import { FinancialDataType } from "../../../types";

interface FinancialParametersProps {
  data: FinancialDataType;
  onChange: (data: FinancialDataType) => void;
}

const FinancialParameters: React.FC<FinancialParametersProps> = ({
  data,
  onChange,
}) => {
  const handleRevenueChange = (stream: string, value: string): void => {
    const newData: FinancialDataType = {
      ...data,
      revenueStreams: {
        ...data.revenueStreams,
        [stream]: parseFloat(value) || 0,
      },
    };
    onChange(newData);
  };

  const handleExpenseChange = (category: string, value: string): void => {
    const newData: FinancialDataType = {
      ...data,
      expenseCategories: {
        ...data.expenseCategories,
        [category]: parseFloat(value) || 0,
      },
    };
    onChange(newData);
  };

  const handleCashReserveChange = (reserve: string, value: string): void => {
    const newData: FinancialDataType = {
      ...data,
      cashReserves: {
        ...data.cashReserves,
        [reserve]: parseFloat(value) || 0,
      },
    };
    onChange(newData);
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-semibold text-blue-900 mb-4 pb-2 border-b border-gray-200">
        Financial Parameters
      </h2>

      <div className="mb-5">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Revenue Streams
        </h3>
        <div className="mb-2 flex justify-between items-center">
          <label className="text-gray-700 w-2/5">Primary:</label>
          <div className="relative w-3/5 flex items-center">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="number"
              className="w-full py-2 px-6 border border-gray-300 rounded-md"
              value={data.revenueStreams.primary}
              onChange={(e) => handleRevenueChange("primary", e.target.value)}
            />
            <span className="ml-2 text-gray-500 text-sm">/mo</span>
          </div>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <label className="text-gray-700 w-2/5">Secondary:</label>
          <div className="relative w-3/5 flex items-center">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="number"
              className="w-full py-2 px-6 border border-gray-300 rounded-md"
              value={data.revenueStreams.secondary}
              onChange={(e) => handleRevenueChange("secondary", e.target.value)}
            />
            <span className="ml-2 text-gray-500 text-sm">/mo</span>
          </div>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <label className="text-gray-700 w-2/5">Other:</label>
          <div className="relative w-3/5 flex items-center">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="number"
              className="w-full py-2 px-6 border border-gray-300 rounded-md"
              value={data.revenueStreams.other}
              onChange={(e) => handleRevenueChange("other", e.target.value)}
            />
            <span className="ml-2 text-gray-500 text-sm">/mo</span>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Expense Categories
        </h3>
        <div className="mb-2 flex justify-between items-center">
          <label className="text-gray-700 w-2/5">Fixed:</label>
          <div className="relative w-3/5 flex items-center">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="number"
              className="w-full py-2 px-6 border border-gray-300 rounded-md"
              value={data.expenseCategories.fixed}
              onChange={(e) => handleExpenseChange("fixed", e.target.value)}
            />
            <span className="ml-2 text-gray-500 text-sm">/mo</span>
          </div>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <label className="text-gray-700 w-2/5">Variable:</label>
          <div className="relative w-3/5 flex items-center">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="number"
              className="w-full py-2 px-6 border border-gray-300 rounded-md"
              value={data.expenseCategories.variable}
              onChange={(e) => handleExpenseChange("variable", e.target.value)}
            />
            <span className="ml-2 text-gray-500 text-sm">/mo</span>
          </div>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <label className="text-gray-700 w-2/5">CAPEX:</label>
          <div className="relative w-3/5 flex items-center">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="number"
              className="w-full py-2 px-6 border border-gray-300 rounded-md"
              value={data.expenseCategories.capex}
              onChange={(e) => handleExpenseChange("capex", e.target.value)}
            />
            <span className="ml-2 text-gray-500 text-sm">/quarter</span>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Cash Reserves
        </h3>
        <div className="mb-2 flex justify-between items-center">
          <label className="text-gray-700 w-2/5">Operating:</label>
          <div className="relative w-3/5 flex items-center">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="number"
              className="w-full py-2 px-6 border border-gray-300 rounded-md"
              value={data.cashReserves.operating}
              onChange={(e) =>
                handleCashReserveChange("operating", e.target.value)
              }
            />
          </div>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <label className="text-gray-700 w-2/5">Emergency:</label>
          <div className="relative w-3/5 flex items-center">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="number"
              className="w-full py-2 px-6 border border-gray-300 rounded-md"
              value={data.cashReserves.emergency}
              onChange={(e) =>
                handleCashReserveChange("emergency", e.target.value)
              }
            />
          </div>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <label className="text-gray-700 w-2/5">Restricted:</label>
          <div className="relative w-3/5 flex items-center">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="number"
              className="w-full py-2 px-6 border border-gray-300 rounded-md"
              value={data.cashReserves.restricted}
              onChange={(e) =>
                handleCashReserveChange("restricted", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialParameters;
