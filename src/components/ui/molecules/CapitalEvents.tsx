// components/dashboard/CapitalEvents.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/shadcn/dialog";
import { Badge } from "@/components/ui/shadcn/badge";

// Update this interface to match what's coming from useRunwayCalculator
interface CapitalEvent {
  id: string;
  type: string; // Changed from specific type to string
  amount: number;
  date: string;
  details: string;
}

interface CapitalEventsProps {
  events: CapitalEvent[]; // This should now match the type in useRunwayCalculator
  addEvent: (event: Omit<CapitalEvent, "id">) => void;
}

export default function CapitalEvents({
  events,
  addEvent,
}: CapitalEventsProps) {
  const [isAddingFunding, setIsAddingFunding] = useState(false);
  const [isAddingDebt, setIsAddingDebt] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Omit<CapitalEvent, "id">>>({
    type: "funding",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    details: "",
  });

  const handleAddEvent = (type: string) => {
    if (!newEvent.amount || !newEvent.date || !newEvent.details) {
      // Show validation error
      return;
    }

    addEvent({
      type,
      amount: newEvent.amount!,
      date: newEvent.date!,
      details: newEvent.details!,
    });

    // Reset form and close dialog
    setNewEvent({
      type,
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      details: "",
    });

    if (type === "funding") {
      setIsAddingFunding(false);
    } else {
      setIsAddingDebt(false);
    }
  };

  // Helper function to format date string as MMM DD, YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-600">
        <CardTitle className="text-white">Capital Events</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Capital Events List */}
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      event.type === "funding"
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {event.type === "funding" ? "$" : "%"}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {event.details}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={"outline"}>
                        {event.type === "funding" ? "Funding" : "Debt"}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(event.date)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${event.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}

            {events.length === 0 && (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No capital events added yet. Add funding or debt financing to
                model future cash flows.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Dialog open={isAddingFunding} onOpenChange={setIsAddingFunding}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  + Add Funding Round
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Funding Round</DialogTitle>
                  <DialogDescription>
                    Enter details about your upcoming or past funding round
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Round Name/Details
                    </label>
                    <Input
                      value={newEvent.details || ""}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, details: e.target.value })
                      }
                      placeholder="e.g., Seed Round, Series A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                          $
                        </span>
                      </div>
                      <Input
                        type="number"
                        value={newEvent.amount || ""}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            amount: Number(e.target.value),
                          })
                        }
                        className="pl-8"
                        placeholder="500000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={newEvent.date || ""}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingFunding(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => handleAddEvent("funding")}>
                    Add Funding
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddingDebt} onOpenChange={setIsAddingDebt}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
                >
                  + Add Debt Financing
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Debt Financing</DialogTitle>
                  <DialogDescription>
                    Enter details about debt financing, loans, or convertible
                    notes
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Financing Details
                    </label>
                    <Input
                      value={newEvent.details || ""}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, details: e.target.value })
                      }
                      placeholder="e.g., Bank Loan, Convertible Note"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                          $
                        </span>
                      </div>
                      <Input
                        type="number"
                        value={newEvent.amount || ""}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            amount: Number(e.target.value),
                          })
                        }
                        className="pl-8"
                        placeholder="250000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={newEvent.date || ""}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingDebt(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => handleAddEvent("debt")}>
                    Add Debt Financing
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
