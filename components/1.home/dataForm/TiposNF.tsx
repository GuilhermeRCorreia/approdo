"use client";

import React, { useEffect, useState } from "react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { getTipoData } from "@/data/home/dataProcessing"; // Ajuste o caminho conforme necessário

type ChartDataItem = {
  activity: string;
  value: number;
  fill: string;
};

const TiposNF = ({ className }: { className?: string }) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [tipoData, setTipoData] = useState({
    despesa: 0,
    revenda: 0,
    materiaPrima: 0,
    collection: 0,
    outros: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTipoData();
      const totalNotes =
        data.despesa +
        data.revenda +
        data.materiaPrima +
        data.collection +
        data.outros;
      setTipoData(data);
      setChartData(
        [
          {
            activity: "Collection",
            value: (data.collection / totalNotes) * 100,
            fill: "hsl(var(--chart-3))",
          },
          {
            activity: "Matéria Prima",
            value: (data.materiaPrima / totalNotes) * 100,
            fill: "hsl(var(--chart-2))",
          },
          {
            activity: "Despesa/Imobilizado",
            value: (data.despesa / totalNotes) * 100,
            fill: "hsl(var(--chart-5))",
          },
          {
            activity: "Revenda",
            value: (data.revenda / totalNotes) * 100,
            fill: "hsl(var(--chart-1)",
          },
          {
            activity: "Outros",
            value: (data.outros / totalNotes) * 100,
            fill: "hsl(var(--chart-4))",
          },
        ].filter((item) => item.value > 0)
      );
    };

    fetchData();
  }, []);

  return (
    <Card className={`max-w-xs h-full ${className}`}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Tipos de Notas Fiscais</CardTitle>
        <CardDescription>Ano atual</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-5 py-5 w-full h-100%">
        <div className="flex flex-col gap-2">
          {tipoData.despesa > 0 && (
            <div className="flex flex-col gap-1 text-sm font-medium">
              <span className="text-emerald-500/80">Despesa: </span>
              <span className="font-bold tabular-nums leading-none text-lg text-white">
                {tipoData.despesa} NFs
              </span>
            </div>
          )}
          {tipoData.revenda > 0 && (
            <div className="flex flex-col gap-1 text-sm font-medium">
              <span className="text-blue-500">Revenda: </span>
              <span className="font-bold tabular-nums leading-none text-lg text-white">
                {tipoData.revenda} NFs
              </span>
            </div>
          )}
          {tipoData.materiaPrima > 0 && (
            <div className="flex flex-col gap-1 truncate text-sm font-medium">
              <span className="text-rose-500">Mat. Prima: </span>
              <span className="font-bold tabular-nums leading-none text-lg text-white">
                {tipoData.materiaPrima} NFs
              </span>
            </div>
          )}
          {tipoData.collection > 0 && (
            <div className="flex flex-col gap-1 text-sm font-medium">
              <span className="text-amber-500">
                Collection: <br />
                <span className="font-bold tabular-nums leading-none text-lg text-white">
                  {tipoData.collection} NFs
                </span>
              </span>
            </div>
          )}
          {tipoData.outros > 0 && (
            <div className="flex flex-col gap-1 text-sm font-medium">
              <span className="text-purple-500">Outros: </span>
              <span className="font-bold tabular-nums leading-none text-lg text-white">
                {tipoData.outros} NFs
              </span>
            </div>
          )}
        </div>
        <ChartContainer
          config={{
            revenda: { label: "Revenda", color: "#33FF57" },
            materiaPrima: { label: "Matéria Prima", color: "#3357FF" },
            collection: { label: "Collection", color: "#FF33A1" },
            despesa: { label: "Despesa/Imobilizado", color: "#FF5733" },
            outros: { label: "Outros", color: "#FFC300" },
          }}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <RadialBarChart
            margin={{ left: -10, right: -10, top: -10, bottom: -10 }}
            data={chartData}
            innerRadius="20%"
            barSize={24}
            startAngle={90}
            endAngle={450}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              dataKey="value"
              tick={false}
            />
            <RadialBar dataKey="value" background cornerRadius={5} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TiposNF;
