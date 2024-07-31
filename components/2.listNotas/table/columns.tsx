import { ColumnDef } from "@tanstack/react-table";
import { PreNotaGeral } from "@/types/prenota";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  CheckCheck,
  MessageSquareQuote,
  Clock,
  ArrowDown01,
  ArrowDownAZ,
  SignalHigh,
  SignalLow,
  SignalMedium,
  Flag,
  ChevronsUp,
  ChevronsDown,
  Minus,
} from "lucide-react";
import { format, parse } from "date-fns";
import { DropdownMenuActions } from "@/components/1.home/preNotaTable/dropMenu";
import { Search } from "./search";

export const columns: ColumnDef<PreNotaGeral>[] = [
  {
    accessorKey: "F1_STATUS",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex text-center"
      >
        Status
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const status = row.original.F1_STATUS;
      const xRev = row.original.F1_XREV;

      if (status && /[a-zA-Z]/.test(status)) {
        return (
          <HoverCard>
            <HoverCardTrigger>
              <span className="truncate text-lime-500">
                <CheckCheck />
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit">
              <p>Classificada</p>
            </HoverCardContent>
          </HoverCard>
        );
      } else if (xRev && /[a-zA-Z]/.test(xRev)) {
        return (
          <HoverCard>
            <HoverCardTrigger>
              <span className="truncate text-red-500">
                <MessageSquareQuote />
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit">
              <p>Revisar</p>
            </HoverCardContent>
          </HoverCard>
        );
      } else {
        return (
          <HoverCard>
            <HoverCardTrigger>
              <span className="truncate text-amber-500">
                <Clock />
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit">
              <p>A Classificar</p>
            </HoverCardContent>
          </HoverCard>
        );
      }
    },
    id: "Status",
  },
  {
    accessorKey: "F1_FILIAL",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex text-center"
      >
        Filial
        <ArrowDown01 className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "F1_DOC",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex text-center"
      >
        Nota Fiscal
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span>
        {row.original.F1_DOC} - {row.original.F1_SERIE}
      </span>
    ),
  },
  {
    accessorKey: "FORNECE",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex text-center"
      >
        Fornecedor
        <ArrowDownAZ className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="truncate max-w-sm">{row.original.FORNECE}</div>
    ),
  },
  {
    accessorKey: "F1_VALBRUT",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex text-center"
      >
        Valor
        <ArrowDown01 className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const value = parseFloat(row.original.F1_VALBRUT);
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  {
    accessorKey: "F1_XTIPO",
    header: "Tipo",
  },
  {
    accessorKey: "F1_DTDIGIT",
    header: "Datas",
    cell: ({ row }) => {
      const rawDateInclusion = row.original.F1_DTDIGIT;
      const rawDateEmission = row.original.F1_EMISSAO;
      const rawDateDue = row.original.VENCIMENTO;

      const formattedDateInclusion = `${rawDateInclusion.substring(
        0,
        4
      )}-${rawDateInclusion.substring(4, 6)}-${rawDateInclusion.substring(
        6,
        8
      )}`;
      const formattedDateEmission = `${rawDateEmission.substring(
        0,
        4
      )}-${rawDateEmission.substring(4, 6)}-${rawDateEmission.substring(6, 8)}`;
      const formattedDateDue = `${rawDateDue.substring(
        0,
        4
      )}-${rawDateDue.substring(4, 6)}-${rawDateDue.substring(6, 8)}`;

      let inclusionDate, emissionDate, dueDate;
      try {
        inclusionDate = format(
          parse(formattedDateInclusion, "yyyy-MM-dd", new Date()),
          "dd/MM/yyyy"
        );
        emissionDate = format(
          parse(formattedDateEmission, "yyyy-MM-dd", new Date()),
          "dd/MM/yyyy"
        );
        dueDate = format(
          parse(formattedDateDue, "yyyy-MM-dd", new Date()),
          "dd/MM/yyyy"
        );
      } catch (e) {
        inclusionDate = "Data inválida";
        emissionDate = "Data inválida";
        dueDate = "Data inválida";
      }

      return (
        <HoverCard>
          <HoverCardTrigger>
            <span>{inclusionDate}</span>
          </HoverCardTrigger>
          <HoverCardContent className="w-fit">
            <p>Inclusão: {inclusionDate}</p>
            <p>Emissão: {emissionDate}</p>
            <p>Vencimento: {dueDate}</p>
          </HoverCardContent>
        </HoverCard>
      );
    },
    id: "Datas",
  },
  {
    accessorKey: "F1_XPRIOR",
    header: "Prioridade",
    cell: ({ row }) => {
      const priority = row.original.F1_XPRIOR.toLowerCase().trim();
      let IconComponent;
      let iconClass;

      switch (priority) {
        case "alta":
          IconComponent = ChevronsUp;
          iconClass = "text-red-600 h-7";
          break;
        case "media":
          IconComponent = Minus;
          iconClass = "text-amber-600 h-7";
          break;
        case "baixa":
          IconComponent = ChevronsDown;
          iconClass = "text-lime-600 h-7";
          break;
        default:
          IconComponent = Flag;
          iconClass = "text-gray-600 h-9"; // Ícone padrão se necessário
          break;
      }

      return (
        <div className="flex justify-center items-center">
          <IconComponent className={iconClass} />
        </div>
      );
    },
    id: "Prioridade",
  },
  {
    accessorKey: "F1_XOBS",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex text-center"
      >
        Observações
        <ArrowDownAZ className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ getValue }) => {
      const obs = getValue() as string;
      return (
        <HoverCard>
          <HoverCardTrigger>
            <span className="text-ellipsis overflow-hidden max-w-xs truncate">
              {obs}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-fit">
            <p>{obs}</p>
          </HoverCardContent>
        </HoverCard>
      );
    },
    id: "Observação",
  },
  {
    id: "actions",
    header: ({ table }) => (
      <div className="flex text-center">
        <Search
          columns={table.getAllColumns().map((column) => column.id)}
          onFilterChange={(column, value) => {
            const tableColumn = table.getColumn(column);
            if (tableColumn) {
              tableColumn.setFilterValue(value);
            }
          }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex w-full justify-center">
        <DropdownMenuActions
          notas={row.original}
          handleActionClick={(action, row) => {}}
        />
      </div>
    ),
  },
];
