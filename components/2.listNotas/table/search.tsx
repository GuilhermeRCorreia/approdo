import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface FilterPopoverProps {
  columns: string[];
  onFilterChange: (column: string, value: string) => void;
}

export const Search: React.FC<FilterPopoverProps> = ({ columns, onFilterChange }) => {
  const [selectedColumn, setSelectedColumn] = useState<string>(columns[0]);
  const [filterValue, setFilterValue] = useState<string>("");

  const handleApplyFilter = () => {
    onFilterChange(selectedColumn, filterValue);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">Filtros <Filter className="h-4"/></Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-64">
        <div className="mb-4">
          <Select value={selectedColumn} onValueChange={setSelectedColumn}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Column" />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          placeholder={`Filter by ${selectedColumn}`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <Button variant="primary" onClick={handleApplyFilter} className="mt-2 w-full">
          Filtrar
        </Button>
      </PopoverContent>
    </Popover>
  );
};
