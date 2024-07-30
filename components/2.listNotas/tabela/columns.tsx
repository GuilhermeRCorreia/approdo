import { useQuery } from "react-query";
import { ColumnDef } from "@tanstack/react-table";
import { parse, format } from "date-fns";
import { DropdownMenuActions } from "./dropMenu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Badge } from "@/components/ui/badge";
export type PreNota = {
  F1_FILIAL: string;
  F1_DOC: string;
  F1_SERIE: string;
  F1_STATUS: string;
  A2_COD: string;
  A2_LOJA: string;
  FORNECE: string;
  A2_NOME: string;
  F1_EMISSAO: string;
  F1_DTDIGIT: string;
  F1_VALBRUT: string;
  F1_XTIPO: string;
  F1_XPRIOR: string;
  F1_XORI: string;
  F1_XUSRRA: string;
  F1_XOBS: string;
  F1_ZOBSREV: string;
  F1_XREV: string;
  VENCIMENTO: string;
  REC: string;
};

const fetchPreNotas = async () => {
  const url =
    "http://172.16.99.174:8400/rest/PreNota/ListaPreNota?pag=1&numItem=3000";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const usePreNotas = () => {
  return useQuery<PreNota[], Error>("prenotas", fetchPreNotas);
};

export const columns: ColumnDef<PreNota>[] = [
  {
    accessorKey: "F1_FILIAL",
    header: "Filial",
    id: "Filial",
  },
  {
    accessorKey: "F1_XUSRRA",
    header: "Usuário",
    id: "Usuário",
  },
  {
    accessorKey: "documento",
    header: "Nota Fiscal",
    cell: (info) => {
      const doc = info.row.original.F1_DOC;
      const serie = info.row.original.F1_SERIE;
      return (
        <span className="truncate">
          {doc} - {serie}
        </span>
      );
    },
    id: "Nota Fiscal",
  },
  {
    accessorKey: "FORNECE",
    header: "Fornecedor",
    cell: (info) => {
      const forn = info.getValue() as string;
      return (
        <HoverCard>
          <HoverCardTrigger>
            {" "}
            <span className="block text-ellipsis overflow-hidden max-w-56 truncate">
              {" "}
              {forn}{" "}
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
    cell: (info) => {
      const value = parseFloat(info.getValue() as string);
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    id: "Valor",
  },
  {
    accessorKey: "F1_EMISSAO",
    header: "Emissão",
    cell: (info) => {
      const rawDate = info.getValue() as string; // Assume que o valor é uma string
      // Formatar a data como YYYY-MM-DD
      const formattedDate = `${rawDate.substring(0, 4)}-${rawDate.substring(
        4,
        6
      )}-${rawDate.substring(6, 8)}`;

      try {
        const date = parse(formattedDate, "yyyy-MM-dd", new Date());
        return format(date, "dd/MM/yyyy");
      } catch (e) {
        return "Data inválida"; // Retorno em caso de erro no parsing
      }
    },
    id: "Emissão",
  },
  {
    accessorKey: "F1_DTDIGIT",
    header: "Inclusão",
    cell: (info) => {
      const rawDate = info.getValue() as string; // Assume que o valor é uma string
      // Formatar a data como YYYY-MM-DD
      const formattedDate = `${rawDate.substring(0, 4)}-${rawDate.substring(
        4,
        6
      )}-${rawDate.substring(6, 8)}`;

      try {
        const date = parse(formattedDate, "yyyy-MM-dd", new Date());
        return format(date, "dd/MM/yyyy");
      } catch (e) {
        return "Data inválida"; // Retorno em caso de erro no parsing
      }
    },
    id: "Inclusão",
  },
  {
    accessorKey: "VENCIMENTO",
    header: "Vencimento",
    cell: (info) => {
      const rawDate = info.getValue() as string; // Assume que o valor é uma string
      // Formatar a data como YYYY-MM-DD
      const formattedDate = `${rawDate.substring(0, 4)}-${rawDate.substring(
        4,
        6
      )}-${rawDate.substring(6, 8)}`;

      try {
        const date = parse(formattedDate, "yyyy-MM-dd", new Date());
        return format(date, "dd/MM/yyyy");
      } catch (e) {
        return "Data inválida"; // Retorno em caso de erro no parsing
      }
    },
    id: "Vencimento",
  },
  {
    accessorKey: "F1_STATUS",
    header: "Status",
    cell: (info) => {
      const status = info.row.original.F1_STATUS;
      const xRev = info.row.original.F1_XREV;

      // Verifica se há pelo menos uma letra em `F1_STATUS`
      if (status && /[a-zA-Z]/.test(status)) {
        return <span className="truncate">Classificada</span>;
      }
      // Verifica se há pelo menos uma letra em `F1_XREV`
      else if (xRev && /[a-zA-Z]/.test(xRev)) {
        return <span className="truncate">Revisar</span>;
      } else {
        return <span className="truncate">A Classificar</span>;
      }
    },
    id: "Status",
  },

  {
    accessorKey: "F1_XOBS",
    header: "Observação",
    cell: (info) => {
      const obs = info.getValue() as string;
      return (
        <HoverCard>
          <HoverCardTrigger>
            {" "}
            <span className="block text-ellipsis overflow-hidden max-w-56 truncate">
              {" "}
              {obs}{" "}
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
    accessorKey: "F1_XPRIOR",
    header: "Prioridade",
    cell: (info) => {
      // Garante que o valor seja uma string e converte para minúsculas
      const priority = (info.getValue() ?? "").toString().trim().toLowerCase();
      // Renderização da célula com estilização apropriada
      return (
        <Badge variant={priority}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      );
    },
    id: "Prioridade",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => (
      <DropdownMenuActions
        notas={row.original}
        handleActionClick={table.options.meta?.handleActionClick}
      />
    ),
  },
];
