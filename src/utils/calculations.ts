// /utils/calculations.ts
import { RunwayCalculatorData } from "@/types";

export function calculateRunway(data: RunwayCalculatorData): Date {
  // This would contain the actual business logic to calculate the runway date
  // For the demo, we'll just add a fixed number of months to the current date
  const currentDate = new Date();
  const runwayDate = new Date(currentDate);
  runwayDate.setMonth(currentDate.getMonth() + 12);
  return runwayDate;
}

export function calculateLowCashWarning(data: RunwayCalculatorData): Date {
  // Similar simplification for the warning date
  const currentDate = new Date();
  const warningDate = new Date(currentDate);
  warningDate.setMonth(currentDate.getMonth() + 8);
  return warningDate;
}
