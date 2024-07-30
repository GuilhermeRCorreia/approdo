import { PreNotaChart } from "@/components/2.listNotas/graphs/PreNotaChart";
import Tabela from "@/components/2.listNotas/tabela/tabela";
import React from "react";

const Page = () => {
  return (
    <div className="mx-10 w-[90vw] h-[100vh] flex flex-col">
      <div className="flex-shrink-0 h-[25vh] w-full">
        <PreNotaChart />
      </div>
      <div className="flex-grow h-[75vh] w-full">
        <Tabela />
      </div>
    </div>
  );
};

export default Page;
