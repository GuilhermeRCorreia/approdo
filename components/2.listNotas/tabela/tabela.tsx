"use client";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { DataTable } from "../../ui/dataTable";
import { columns, usePreNotas } from "./columns";
import { Toolbar } from "./toolbar";
import { DataTablePagination } from "./pagination"; // Certifique-se de que o caminho está correto
import { Skeleton } from "../../ui/skeleton";

export default function Tabela() {
  const { data, error, isLoading } = usePreNotas();

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
  };

  const handleActionClick = (action, row) => {
    console.log(`Action ${action} clicked for row:`, row);
    // Adicione aqui a lógica para cada ação, como navegação, modais, etc.
  };

  const handleFilterChange = (filters) => {
    // Lógica para atualizar os filtros e refazer a consulta
    // Dependendo da implementação do hook usePreNotas, pode ser necessário ajustar essa parte
    // refetch(); // Descomente se estiver usando react-query para refetch
  };

  const table = useReactTable({
    data: data || [], // Passa uma array vazia se os dados ainda não foram carregados
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      handleActionClick: handleActionClick,
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-col space-y-5 items-center justify-center h-full w-full">
        <div className="flex">
          <Skeleton className="h-4 w-[950px]" />{" "}
        </div>
        <Skeleton className="h-full w-full rounded-xl" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-[950px]" />{" "}
        </div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-full flex flex-col items-center justify-center w-full space-y-3">
      <Toolbar tableInstance={table} onFilterChange={handleFilterChange} />
      <DataTable
        columns={columns}
        data={table.getRowModel().rows.map((row) => row.original)} // Usa as linhas paginadas
        onRowClick={handleRowClick}
        onActionClick={handleActionClick}
      />
      <DataTablePagination table={table} />
    </div>
  );
}
