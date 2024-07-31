import { ColumnDef } from "@tanstack/react-table";
import { format, parse } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuActions } from "./dropMenu";
import {
  CheckCheck,
  Clock,
  MessageSquareQuote,
  SignalHigh,
  SignalLow,
  SignalMedium,
} from "lucide-react";
import SearchPopover from "./SearchPopover";

export interface PreNota {
  F1_FILIAL: string;
  F1_DOC: string;
  F1_SERIE: string;
  FORNECE: string;
  F1_XTIPO: string;
  F1_VALBRUT: string;
  F1_DTDIGIT: string;
  F1_EMISSAO: string;
  VENCIMENTO: string;
  F1_STATUS: string;
  F1_XREV: string;
  F1_XOBS: string;
  F1_XPRIOR: string;
}

export const columns = (
  onSearch: (query: string) => void
): ColumnDef<PreNota>[] => [
  {
    accessorKey: "F1_STATUS",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.F1_STATUS;
      const xRev = row.original.F1_XREV;
      let statusContent, statusClass;

      switch (true) {
        case status && /[a-zA-Z]/.test(status):
          statusContent = "Classificada";
          statusClass = "text-lime-500";
          break;
        case xRev && /[a-zA-Z]/.test(xRev):
          statusContent = "Revisar";
          statusClass = "text-red-500";
          break;
        default:
          statusContent = "A Classificar";
          statusClass = "text-amber-500";
          break;
      }

      return (
        <HoverCard>
          <HoverCardTrigger>
            <span className={`truncate ${statusClass}`}>
              {statusContent === "Classificada" ? (
                <CheckCheck />
              ) : statusContent === "Revisar" ? (
                <MessageSquareQuote />
              ) : (
                <Clock />
              )}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-fit">
            <p>{statusContent}</p>
          </HoverCardContent>
        </HoverCard>
      );
    },
    id: "Status",
  },
  {
    accessorKey: "F1_FILIAL",
    header: "Filial",
    id: "Filial",
  },
  {
    accessorKey: "documento",
    header: "Nota Fiscal",
    cell: ({ row }) => {
      const doc = row.original.F1_DOC;
      const serie = row.original.F1_SERIE;
      return (
        <HoverCard>
          <HoverCardTrigger>
            <span className="truncate">
              {doc} - {serie}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-fit">
            <p>{row.original.usuario}</p>
          </HoverCardContent>
        </HoverCard>
      );
    },
    id: "Nota Fiscal",
  },
  {
    accessorKey: "FORNECE",
    header: "Fornecedor",
    cell: ({ getValue }) => {
      const forn = getValue() as string;
      return (
        <HoverCard>
          <HoverCardTrigger>
            <span className="block text-ellipsis overflow-hidden max-w-56 truncate">
              {forn}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-fit">
            <p>{forn}</p>
          </HoverCardContent>
        </HoverCard>
      );
    },
    id: "Fornecedor",
  },
  {
    accessorKey: "F1_XTIPO",
    header: "Tipo",
    id: "Tipo",
  },
  {
    accessorKey: "F1_VALBRUT",
    header: "Valor",
    cell: ({ getValue }) => {
      const value = parseFloat(getValue() as string);
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    id: "Valor",
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
          IconComponent = SignalHigh;
          iconClass = "text-red-600 h-7";
          break;
        case "media":
          IconComponent = SignalMedium;
          iconClass = "text-amber-600 h-7";
          break;
        case "baixa":
          IconComponent = SignalLow;
          iconClass = "text-lime-600 h-7";
          break;
        default:
          IconComponent = SignalLow;
          iconClass = "text-gray-600 h-9"; // Ícone padrão se necessário
          break;
      }

      return (
        <div className="flex justify-center items-center">
          <HoverCard>
            <HoverCardTrigger>
              <IconComponent className={iconClass} />
            </HoverCardTrigger>
            <HoverCardContent className="w-fit h-fit">
              {row.original.F1_XPRIOR}
            </HoverCardContent>
          </HoverCard>
        </div>
      );
    },
    id: "Prioridade",
  },
  {
    accessorKey: "F1_XOBS",
    header: "Observação",
    cell: ({ getValue }) => {
      const obs = getValue() as string;
      return (
        <HoverCard>
          <HoverCardTrigger>
            <span className="block text-ellipsis overflow-hidden max-w-32 truncate">
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
    header: <SearchPopover onSearch={onSearch} />,
    enableHiding: false,
    cell: ({ row, table }) => (
      <DropdownMenuActions
        notas={row.original}
        handleActionClick={table.options.meta?.handleActionClick}
      />
    ),
  },
];
