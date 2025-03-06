// src/components/CampaignSettings.tsx
import React from "react";
import { CampaignSettings as CampaignSettingsType } from "../types/marketing-roi";

interface CampaignSettingsProps {
  settings: CampaignSettingsType;
  onChange: (settings: Partial<CampaignSettingsType>) => void;
}

const CampaignSettings: React.FC<CampaignSettingsProps> = ({
  settings,
  onChange,
}) => {
  const handleInputChange = (field: keyof CampaignSettingsType, value: any) => {
    onChange({ [field]: value });
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Campaign Configuration
        </h2>
        <p className="text-sm text-blue-600">
          Define your campaign details and parameters to get accurate ROI
          projections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Name
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Budget
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                value={settings.totalBudget}
                min={0}
                onChange={(e) =>
                  handleInputChange(
                    "totalBudget",
                    parseFloat(e.target.value) || 0
                  )
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={formatDate(settings.startDate)}
                onChange={(e) =>
                  handleInputChange("startDate", new Date(e.target.value))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={formatDate(settings.endDate)}
                onChange={(e) =>
                  handleInputChange("endDate", new Date(e.target.value))
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Audience
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.targetAudience}
              onChange={(e) =>
                handleInputChange("targetAudience", e.target.value)
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overhead Costs
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                value={settings.overheadCosts}
                min={0}
                onChange={(e) =>
                  handleInputChange(
                    "overheadCosts",
                    parseFloat(e.target.value) || 0
                  )
                }
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Fixed costs not directly tied to specific marketing channels
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Rate (% for NPV)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                value={settings.discountRate}
                min={0}
                max={100}
                step={0.5}
                onChange={(e) =>
                  handleInputChange(
                    "discountRate",
                    parseFloat(e.target.value) || 0
                  )
                }
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Used for Net Present Value calculations, typically your cost of
              capital
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seasonality Impact
            </label>
            <div className="grid grid-cols-12 gap-1 mt-2">
              {settings.seasonalityFactors.map((factor, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t-sm"
                    style={{ height: `${factor * 50}px` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">{index + 1}</div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Monthly seasonality factors (values above 1 indicate
              higher-than-average sales periods)
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Campaign Settings
        </button>
      </div>
    </div>
  );
};

export default CampaignSettings;
