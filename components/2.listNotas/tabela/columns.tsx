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
import { CheckCheck, Clock, MessageSquareQuote } from "lucide-react";
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
    accessorKey: "F1_STATUS",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.F1_STATUS;
      const xRev = row.original.F1_XREV;

      if (status && /[a-zA-Z]/.test(status)) {
        return (
          <HoverCard>
            <HoverCardTrigger>
              <span className="truncate text-lime-500"><CheckCheck /></span>
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
              <span className="truncate text-red-500"><MessageSquareQuote /></span>
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
              <span className="truncate text-amber-500"><Clock /></span>
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
    accessorKey: "F1_DTDIGIT",
    header: "Datas",
    cell: ({ row }) => {
      const rawDateInclusion = row.original.F1_DTDIGIT;
      const rawDateEmission = row.original.F1_EMISSAO;
      const rawDateDue = row.original.VENCIMENTO;

      const formattedDateInclusion = `${rawDateInclusion.substring(0, 4)}-${rawDateInclusion.substring(4, 6)}-${rawDateInclusion.substring(6, 8)}`;
      const formattedDateEmission = `${rawDateEmission.substring(0, 4)}-${rawDateEmission.substring(4, 6)}-${rawDateEmission.substring(6, 8)}`;
      const formattedDateDue = `${rawDateDue.substring(0, 4)}-${rawDateDue.substring(4, 6)}-${rawDateDue.substring(6, 8)}`;

      let inclusionDate, emissionDate, dueDate;
      try {
        inclusionDate = format(parse(formattedDateInclusion, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");
        emissionDate = format(parse(formattedDateEmission, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");
        dueDate = format(parse(formattedDateDue, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");
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
        <Badge variant={priority.charAt(0).toUpperCase() + priority.slice(1)}>
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
