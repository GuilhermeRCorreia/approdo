// src/pages/DashboardPage.tsx
"use client";

import { useEffect, useState } from "react";
import { OrderDetails } from "@/components/1.home/OrderDetails";
import DataTable from "@/components/1.home/preNotaTable/DataTable";
import CostArea from "@/components/1.home/dataForm/CostArea";
import StatusBarChartCard from "@/components/1.home/dataForm/StatusBars";
import IntroCard from "@/components/1.home/dataForm/CardIntro";
import TiposNF from "@/components/1.home/dataForm/TiposNF";

const DashboardPage = () => {
  const [data, setData] = useState({
    thisWeek: 0,
    thisMonth: 0,
    percentageChangeWeek: 0,
    percentageChangeMonth: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/dashboard");
      const result = await response.json();
      setData({
        thisWeek: result.thisWeek,
        thisMonth: result.thisMonth,
        percentageChangeWeek: result.percentageChangeWeek,
        percentageChangeMonth: result.percentageChangeMonth,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-between p-3">
      <div className="w-[65vw] flex flex-col gap-3">
        <div className="flex justify-end space-x-3">
          <div className="w-[12vw] h-[300px]">
            <IntroCard />
          </div>{" "}
          <div className="w-[17.6vw] h-[300px]">
            <TiposNF />
          </div>
          <div className="w-[17.6vw] h-[300px]">
            <CostArea />
          </div>
          <div className="w-[17.6vw] h-[300px]">
            <StatusBarChartCard />
          </div>
        </div>
        <div className="rouned-xl">
          <DataTable />
        </div>
      </div>
      <div className="w-[30vw]">
        <OrderDetails />
      </div>
    </div>
  );
};

export default DashboardPage;
