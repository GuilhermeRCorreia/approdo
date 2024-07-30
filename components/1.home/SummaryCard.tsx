import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React from "react";

interface SummaryCardProps {
  title: string;
  description?: string;
  value: string;
  percentageChange?: string;
  progressValue?: number;
}

export const SummaryCard = ({ title, description, value, percentageChange, progressValue }: SummaryCardProps) => (
  <Card className="bg-card">
    <CardHeader className="pb-2">
      {description && <CardDescription>{description}</CardDescription>}
      <CardTitle className="text-4xl">{value}</CardTitle>
    </CardHeader>
    {percentageChange && (
      <CardContent>
        <div className="text-xs text-muted-foreground">{percentageChange}</div>
      </CardContent>
    )}
    {progressValue !== undefined && (
      <CardFooter>
        <Progress value={progressValue} aria-label={`${progressValue}% increase`} />
      </CardFooter>
    )}
  </Card>
);
