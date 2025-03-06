// /components/WarningCard.tsx
import React from "react";

interface WarningCardProps {
  type: "warning" | "danger";
  title: string;
  date: Date;
  months: number;
}

export default function WarningCard({
  type,
  title,
  date,
  months,
}: WarningCardProps) {
  const bgColor = type === "warning" ? "bg-yellow-100" : "bg-red-100";
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);

  return (
    <div className={`${bgColor} rounded-md p-4`}>
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <div className="text-2xl font-bold">{formattedDate}</div>
      <p className="text-sm mt-1">{months} months remaining</p>
    </div>
  );
}
