"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchMonthlySumF1ValBrut } from "@/data/home/dataProcessing";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartDataItem {
  month: string;
  sum: number;
  fill: string;
  formattedSum: string;
}

const CostArea = () => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [monthlyAverage, setMonthlyAverage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMonthlySumF1ValBrut();
      setChartData(
        result
          .map((item, index) => ({
            month: item.month,
            sum: item.sum,
            fill: "hsl(var(--chart-5))",
            formattedSum: item.formattedSum,
          }))
          .reverse()
      ); // Ensure months are in correct order
      const totalSum = result.reduce((acc, item) => acc + item.sum, 0);
      setMonthlyAverage(
        (totalSum / result.length).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          useGrouping: true,
        })
      );
    };

    fetchData();
  }, []);

  const chartConfig = {
    sum: {
      label: "Valor",
      color: "hsl(var(--chart-6))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col h-full w-full">
      <CardHeader className="space-y-0 pb-0">
        <CardDescription> Média de Custo por mês:</CardDescription>
        <CardTitle className="flex items-baseline gap-1 text-3xl tabular-nums">
          R$ {monthlyAverage}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-sum)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-sum)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis hide />
              <YAxis hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
                formatter={(value, name, props) => (
                  <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                    {props.payload.month}: 
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                      R$ {value.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true,
                      })}
                    </div>
                  </div>
                )}
              />
              <Area
                type="monotone"
                dataKey="sum"
                stroke="var(--color-sum)"
                fill="url(#fillColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CostArea;
