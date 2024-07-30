import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { fetchPreNotaData } from "@/data/home/apiRequests";
import { columns, PreNota } from "./columns";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Pagination } from "./Pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const DataTable: React.FC = () => {
  const [data, setData] = useState<PreNota[]>([]);
  const [filteredData, setFilteredData] = useState<PreNota[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchPreNotaData();
      setData(result);
      setFilteredData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  };

  const table = useReactTable({
    data: filteredData,
    columns: columns(handleSearch),
    pageCount: Math.ceil(filteredData.length / 10),
    state: { pagination: { pageIndex: 0, pageSize: 10 } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card className="flex h-[64vh] flex-col">
      <CardContent className="flex-grow overflow-auto">
        <Table className="mt-3 w-full">
          <TableHeader className="h-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-lg">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-full">
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="flex-grow">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Pagination table={table} />
      </CardFooter>
    </Card>
  );
};

export default DataTable;
