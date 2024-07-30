"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { fetchStatusCounts } from "@/data/home/dataProcessing";

const StatusBars = ({ className }: { className?: string }) => {
  const [chartData, setChartData] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    aClassificar: 0,
    classificada: 0,
    revisar: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchStatusCounts();
      setStatusCounts(result);
      setChartData([
        { activity: "Pendente", value: result.aClassificar, fill: "hsl(var(--chart-3))" },
        { activity: "Classificada", value: result.classificada, fill: "hsl(var(--chart-2))" },
        { activity: "Revisar", value: result.revisar, fill: "hsl(var(--chart-5))" }
      ]);
    };

    fetchData();
  }, []);

  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Status da NF</CardTitle>
        <CardDescription>Mês atual</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            aClassificar: { label: "Pendente", color: "hsl(var(--chart-4))" },
            classificada: { label: "Classificada", color: "hsl(var(--chart-5))" },
            revisar: { label: "Revisar", color: "hsl(var(--chart-2))" },
          }}
          className="h-[140px] w-full"
        >
          <BarChart
            margin={{
              left: 22,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={chartData}
            className=""
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" scale="log" domain={[1, 'dataMax']} hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
              className="capitalize truncate"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="value"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground truncate">Pendente</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {statusCounts.aClassificar}
              <span className="text-sm font-normal text-muted-foreground"> NFs</span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Classificada</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {statusCounts.classificada}
              <span className="text-sm font-normal text-muted-foreground"> NFs</span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Revisar</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {statusCounts.revisar}
              <span className="text-sm font-normal text-muted-foreground"> NFs</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StatusBars;
