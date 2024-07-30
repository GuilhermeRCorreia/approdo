"use client";

import * as React from "react";
import { TooltipProps } from "recharts";

const ChartTooltipContent = ({ active, payload }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg bg-background px-3 py-2 shadow-md">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
          <span className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></span>
          <span className="font-medium">{entry.payload.status}</span>
          <span className="ml-auto font-mono font-medium">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default ChartTooltipContent;
