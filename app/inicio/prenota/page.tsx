"use client";
import React, { useState, useEffect } from "react";
import { PreNotaChart } from "@/components/2.listNotas/graphs/PreNotaChart";
import { DataTable } from "@/components/2.listNotas/table/dataTable";
import { fetchPreNotaData } from "@/data/geral/dataProcessing";
import { columns } from "@/components/2.listNotas/table/columns";
import { Button } from "@/components/ui/button";
import { TipeChart } from "@/components/2.listNotas/graphs/TipeChart";

const Page: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchPreNotaData();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="mx-10 my-2 w-[90vw] h-[100vh] flex flex-col space-y-5">
      <div className="flex-shrink-0 space-x-4 flex h-[30vh] w-full">
        <div className="w-1/2">
          <TipeChart />
        </div>
        <div className="w-1/2">
          {" "}
          <PreNotaChart />
        </div>
      </div>
      <div className="w-full flex justify-end space-x-3">
        <Button variant={"secondary"}>Adicionar Manualmente</Button>
        <Button>Importar XML</Button>
      </div>
      <div className="flex-grow h-fit w-full">
        <DataTable columns={columns} data={data} loading={loading} />
      </div>
    </div>
  );
};

export default Page;
