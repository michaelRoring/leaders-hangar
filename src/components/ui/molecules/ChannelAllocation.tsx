// src/components/ChannelAllocation.tsx
import React, { useState } from "react";
import { MarketingChannel } from "../../../types/marketing-roi";

interface ChannelAllocationProps {
  channels: MarketingChannel[];
  onChange: (channels: MarketingChannel[]) => void;
}

const ChannelAllocation: React.FC<ChannelAllocationProps> = ({
  channels,
  onChange,
}) => {
  const [editingChannel, setEditingChannel] = useState<MarketingChannel | null>(
    null
  );

  const handleChannelToggle = (channelId: string) => {
    const updatedChannels = channels.map((channel) => {
      if (channel.id === channelId) {
        return { ...channel, enabled: !channel.enabled };
      }
      return channel;
    });
    onChange(updatedChannels);
  };

  const handleChannelBudgetChange = (channelId: string, budget: number) => {
    const updatedChannels = channels.map((channel) => {
      if (channel.id === channelId) {
        return { ...channel, budget };
      }
      return channel;
    });
    onChange(updatedChannels);
  };

  const handleChannelEdit = (channel: MarketingChannel) => {
    setEditingChannel({ ...channel });
  };

  const handleEditSave = () => {
    if (!editingChannel) return;

    const updatedChannels = channels.map((channel) => {
      if (channel.id === editingChannel.id) {
        return editingChannel;
      }
      return channel;
    });

    onChange(updatedChannels);
    setEditingChannel(null);
  };

  const totalBudget = channels.reduce(
    (sum, channel) => (channel.enabled ? sum + channel.budget : sum),
    0
  );

  const getEfficiencyScore = (channel: MarketingChannel): number => {
    // Simple efficiency calculation
    return (
      (channel.averageOrderValue * (channel.conversionRate / 100)) / channel.cac
    );
  };

  const getEfficiencyClass = (score: number): string => {
    if (score >= 1.2) return "text-green-500";
    if (score >= 0.8) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Marketing Channel Allocation
        </h2>
        <p className="text-sm text-blue-600">
          Distribute your budget across marketing channels and adjust
          performance metrics.
        </p>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Channel
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Budget
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      % of Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CAC
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Conv. Rate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Efficiency
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {channels.map((channel) => {
                    const efficiencyScore = getEfficiencyScore(channel);
                    const efficiencyClass = getEfficiencyClass(efficiencyScore);

                    return (
                      <tr
                        key={channel.id}
                        className={!channel.enabled ? "bg-gray-50" : ""}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              checked={channel.enabled}
                              onChange={() => handleChannelToggle(channel.id)}
                            />
                            <span
                              className={`ml-3 ${
                                !channel.enabled ? "text-gray-400" : ""
                              }`}
                            >
                              {channel.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                $
                              </span>
                            </div>
                            <input
                              type="number"
                              className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-4 sm:text-sm border-gray-300 rounded-md ${
                                !channel.enabled ? "bg-gray-100" : ""
                              }`}
                              value={channel.budget}
                              disabled={!channel.enabled}
                              onChange={(e) =>
                                handleChannelBudgetChange(
                                  channel.id,
                                  parseFloat(e.target.value) || 0
                                )
                              }
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {channel.enabled
                              ? ((channel.budget / totalBudget) * 100).toFixed(
                                  1
                                ) + "%"
                              : "-"}
                          </div>
                          {channel.enabled && (
                            <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                              <div
                                className="h-full bg-blue-600 rounded-full"
                                style={{
                                  width: `${
                                    (channel.budget / totalBudget) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${channel.cac.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {channel.conversionRate.toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${efficiencyClass} bg-opacity-10`}
                          >
                            {efficiencyScore.toFixed(2)}x
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleChannelEdit(channel)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                      Total
                    </td>
                    <td className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                      ${totalBudget.toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                      100%
                    </td>
                    <td colSpan={4}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Channel Editing Modal */}
      {editingChannel && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Edit Channel: {editingChannel.name}
                    </h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Customer Acquisition Cost (CAC)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-4 sm:text-sm border-gray-300 rounded-md"
                            value={editingChannel.cac}
                            onChange={(e) =>
                              setEditingChannel({
                                ...editingChannel,
                                cac: parseFloat(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Conversion Rate
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type="number"
                            step="0.1"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 sm:text-sm border-gray-300 rounded-md"
                            value={editingChannel.conversionRate}
                            onChange={(e) =>
                              setEditingChannel({
                                ...editingChannel,
                                conversionRate: parseFloat(e.target.value) || 0,
                              })
                            }
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">%</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cost Per Click
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            step="0.01"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-4 sm:text-sm border-gray-300 rounded-md"
                            value={editingChannel.costPerClick}
                            onChange={(e) =>
                              setEditingChannel({
                                ...editingChannel,
                                costPerClick: parseFloat(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Click-Through Rate
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type="number"
                            step="0.1"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 sm:text-sm border-gray-300 rounded-md"
                            value={editingChannel.clickThroughRate}
                            onChange={(e) =>
                              setEditingChannel({
                                ...editingChannel,
                                clickThroughRate:
                                  parseFloat(e.target.value) || 0,
                              })
                            }
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">%</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Average Order Value
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-4 sm:text-sm border-gray-300 rounded-md"
                            value={editingChannel.averageOrderValue}
                            onChange={(e) =>
                              setEditingChannel({
                                ...editingChannel,
                                averageOrderValue:
                                  parseFloat(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleEditSave}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setEditingChannel(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelAllocation;
