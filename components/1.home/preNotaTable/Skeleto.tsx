// src/components/preNotaTable/SkeleTable.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Skeleto: React.FC = () => {
  return (
    <div className="w-full h-[60vh]">
      <table className="w-full h-[59vh] bg-background rounded border">
        <thead>
          <tr>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Filial</th>
            <th className="p-2 text-left">Nota Fiscal</th>
            <th className="p-2 text-left">Fornecedor</th>
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2 text-left">Valor</th>
            <th className="p-2 text-left">Datas</th>

            <th className="p-2 text-left">Observação</th>
            <th className="p-2 text-left">Prioridade</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <td className="p-2">
                <Skeleton className="h-4 w-full" />
              </td>
              <td className="p-2">
                <Skeleton className="h-4 w-full" />
              </td>
              <td className="p-2">
                <Skeleton className="h-4 w-full" />
              </td>
              <td className="p-2">
                <Skeleton className="h-4 w-full" />
              </td>
              <td className="p-2">
                <Skeleton className="h-4 w-full" />
              </td>
              <td className="p-2">
                <Skeleton className="h-4 w-full" />
              </td>
              <td className="p-2">
                <Skeleton className="h-4 w-full" />
              </td>
              <td className="p-2">
                <Skeleton className="h-4 w-full" />
              </td>
              <td className="p-2">
                <Skeleton className="h-4 w-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Skeleto;
