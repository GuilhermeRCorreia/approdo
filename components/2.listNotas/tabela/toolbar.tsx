import React from "react";
import { Button } from "@/components/ui/button";
import { TableInstance } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { labels, statuses, priorities } from "@/data/filters";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
} from "@/components/ui/menubar";
import FilterGroup from "./FilterGroup";
import { FilePlus } from "lucide-react";

interface ToolbarProps<TData> {
  tableInstance: TableInstance<TData>;
  onFilterChange: (filters: Record<string, string>) => void;
}

export const Toolbar = <TData,>({
  tableInstance,
  onFilterChange,
}: ToolbarProps<TData>) => {
  const [filters, setFilters] = React.useState({});

  const { setGlobalFilter, getAllColumns, setFilter } = tableInstance;

  const handleSelectFilial = (value: string) => {
    const newFilters = { ...filters, F1_FILIAL: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSelectType = (value: string) => {
    const newFilters = { ...filters, F1_XTIPO: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSelectStatus = (value: string) => {
    const newFilters = { ...filters, F1_STATUS: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSelectPriority = (value: string) => {
    const newFilters = { ...filters, F1_XPRIOR: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex justify-between gap-4 w-full">
      <div className="flex space-x-6">
        <Input
          type="text"
          placeholder="Filter records..."
          onChange={(e) => {
            const newFilters = { ...filters, global: e.target.value };
            setFilters(newFilters);
            onFilterChange(newFilters);
            setGlobalFilter(e.target.value);
          }}
          className="w-64 bg-gray-50 dark:bg-gray-950"
        />
        <FilterGroup
          endpoint="reidoapsdu/consultar/cargaInicio/"
          onSelect={handleSelectFilial}
        />
        <Menubar className="flex gap-4">
          <MenubarMenu>
            <MenubarTrigger className="hover:bg-gray-200 dark:hover:bg-gray-900">
              Ver Colunas
            </MenubarTrigger>
            <MenubarContent>
              {getAllColumns().map((column) => (
                <MenubarCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={() => column.toggleVisibility()}
                >
                  {column.id}
                </MenubarCheckboxItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>{" "}
      </div>
      <div className="flex gap-2">
      <Button variant="secondary">
          <a href="/inicio/compras/manual">Adicionar Manualmente </a>
        </Button>
        <Button variant="default">
          <a href="/inicio/compras/xml">Adicionar  por XML</a> 
        </Button>

      </div>
    </div>
  );
};

export default Toolbar;
