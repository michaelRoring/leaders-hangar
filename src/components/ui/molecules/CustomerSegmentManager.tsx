// src/components/CustomerSegmentManager.tsx
import React, { useState } from "react";
import { CustomerSegment } from "../../../types/marketing-roi";

interface CustomerSegmentManagerProps {
  segments: CustomerSegment[];
  onChange: (segments: CustomerSegment[]) => void;
}

const CustomerSegmentManager: React.FC<CustomerSegmentManagerProps> = ({
  segments,
  onChange,
}) => {
  const [editingSegment, setEditingSegment] = useState<CustomerSegment | null>(
    null
  );

  const handleSegmentEdit = (segment: CustomerSegment) => {
    setEditingSegment({ ...segment });
  };

  const handleEditSave = () => {
    if (!editingSegment) return;

    // Ensure percentages sum to 100%
    const otherSegments = segments.filter(
      (seg) => seg.id !== editingSegment.id
    );
    const currentTotal = otherSegments.reduce(
      (sum, seg) => sum + seg.percentage,
      0
    );

    // If we're going over 100%, adjust the percentage
    let adjustedPercentage = editingSegment.percentage;
    if (currentTotal + adjustedPercentage > 100) {
      adjustedPercentage = 100 - currentTotal;
    }

    const updatedSegment = {
      ...editingSegment,
      percentage: adjustedPercentage,
    };

    const updatedSegments = segments.map((segment) => {
      if (segment.id === updatedSegment.id) {
        return updatedSegment;
      }
      return segment;
    });

    onChange(updatedSegments);
    setEditingSegment(null);
  };

  const addNewSegment = () => {
    // Create a new segment with default values
    const currentTotal = segments.reduce((sum, seg) => sum + seg.percentage, 0);
    const availablePercentage = Math.max(0, 100 - currentTotal);

    const newSegment: CustomerSegment = {
      id: `seg${segments.length + 1}`,
      name: `Segment ${segments.length + 1}`,
      percentage: availablePercentage,
      churnRate: 20,
      averageOrderValue: 100,
      purchaseFrequency: 4,
      lifetimeMonths: 18,
    };

    onChange([...segments, newSegment]);
  };

  const deleteSegment = (segmentId: string) => {
    if (segments.length <= 1) {
      alert("You must have at least one customer segment.");
      return;
    }

    const segmentToDelete = segments.find((seg) => seg.id === segmentId);
    if (!segmentToDelete) return;

    // Redistribute the percentage to other segments
    const remainingSegments = segments.filter((seg) => seg.id !== segmentId);
    const totalRemainingPercentage = remainingSegments.reduce(
      (sum, seg) => sum + seg.percentage,
      0
    );

    // Only redistribute if there are other segments and their total isn't already 100%
    if (remainingSegments.length > 0 && totalRemainingPercentage < 100) {
      const percentageToRedistribute = segmentToDelete.percentage;
      const redistributionRatio =
        percentageToRedistribute / totalRemainingPercentage;

      const adjustedSegments = remainingSegments.map((segment) => ({
        ...segment,
        percentage:
          segment.percentage + segment.percentage * redistributionRatio,
      }));

      onChange(adjustedSegments);
    } else {
      onChange(remainingSegments);
    }
  };

  const getTotalCLTV = (segment: CustomerSegment): number => {
    return (
      segment.averageOrderValue *
      segment.purchaseFrequency *
      (segment.lifetimeMonths / 12) *
      (1 - segment.churnRate / 100)
    );
  };

  const getCLTVColor = (cltv: number): string => {
    if (cltv > 500) return "text-green-500";
    if (cltv > 300) return "text-blue-500";
    if (cltv > 150) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Customer Segment Analysis
        </h2>
        <p className="text-sm text-blue-600">
          Define your customer segments to calculate more accurate customer
          lifetime value.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={addNewSegment}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={
            segments.reduce((sum, seg) => sum + seg.percentage, 0) >= 100
          }
        >
          Add New Segment
        </button>
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
                      Segment
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      % of Customers
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Churn Rate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Avg. Order Value
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Purchase Frequency
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Lifetime Value
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
                  {segments.map((segment) => {
                    const cltv = getTotalCLTV(segment);
                    const cltvClass = getCLTVColor(cltv);

                    return (
                      <tr key={segment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {segment.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {segment.percentage}%
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                            <div
                              className="h-full bg-indigo-600 rounded-full"
                              style={{ width: `${segment.percentage}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {segment.churnRate}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${segment.averageOrderValue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {segment.purchaseFrequency}/year
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`${cltvClass} text-sm font-semibold`}
                          >
                            ${cltv.toFixed(0)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                          <button
                            onClick={() => handleSegmentEdit(segment)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteSegment(segment.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
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
                      {segments.reduce((sum, seg) => sum + seg.percentage, 0)}%
                    </td>
                    <td colSpan={5}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Segment Editing Modal */}
      {editingSegment && (
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
                      Edit Segment
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Segment Name
                        </label>
                        <input
                          type="text"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={editingSegment.name}
                          onChange={(e) =>
                            setEditingSegment({
                              ...editingSegment,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Percentage of Customers
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type="number"
                            min="1"
                            max="100"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 sm:text-sm border-gray-300 rounded-md"
                            value={editingSegment.percentage}
                            onChange={(e) =>
                              setEditingSegment({
                                ...editingSegment,
                                percentage: Math.min(
                                  100,
                                  parseFloat(e.target.value) || 0
                                ),
                              })
                            }
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">%</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Churn Rate
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 sm:text-sm border-gray-300 rounded-md"
                              value={editingSegment.churnRate}
                              onChange={(e) =>
                                setEditingSegment({
                                  ...editingSegment,
                                  churnRate: parseFloat(e.target.value) || 0,
                                })
                              }
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                %
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Average Order Value
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                $
                              </span>
                            </div>
                            <input
                              type="number"
                              min="0"
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-4 sm:text-sm border-gray-300 rounded-md"
                              value={editingSegment.averageOrderValue}
                              onChange={(e) =>
                                setEditingSegment({
                                  ...editingSegment,
                                  averageOrderValue:
                                    parseFloat(e.target.value) || 0,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Purchase Frequency (per year)
                          </label>
                          <input
                            type="number"
                            min="0.1"
                            step="0.1"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={editingSegment.purchaseFrequency}
                            onChange={(e) =>
                              setEditingSegment({
                                ...editingSegment,
                                purchaseFrequency:
                                  parseFloat(e.target.value) || 0,
                              })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Lifetime in Months
                          </label>
                          <input
                            type="number"
                            min="1"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={editingSegment.lifetimeMonths}
                            onChange={(e) =>
                              setEditingSegment({
                                ...editingSegment,
                                lifetimeMonths: parseFloat(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-sm font-medium text-gray-700">
                          Calculated LTV
                        </div>
                        <div className="text-2xl font-bold text-indigo-600 mt-1">
                          ${getTotalCLTV(editingSegment).toFixed(0)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Based on order value, purchase frequency, churn rate,
                          and lifetime
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
                  onClick={() => setEditingSegment(null)}
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

export default CustomerSegmentManager;
