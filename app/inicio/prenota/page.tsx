import Tabela from "@/components/2.listNotas/tabela/tabela";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-center items center h-screen">
      <div className="w-full h-1/3"></div>
      <div className="flex-1 w-[93vw]">
        <Tabela />
      </div>
    </div>
  );
};

export default page;
