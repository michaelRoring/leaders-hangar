// /components/DateInput.tsx
import React from "react";

interface DateInputProps {
  value: Date;
  onChange: (date: Date) => void;
}

export default function DateInput({ value, onChange }: DateInputProps) {
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <input
      type="date"
      value={formatDateForInput(value)}
      onChange={(e) => onChange(new Date(e.target.value))}
      className="border rounded px-2 py-1 w-full"
    />
  );
}
