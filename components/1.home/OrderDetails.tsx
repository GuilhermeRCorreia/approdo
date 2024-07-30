// components/OrderDetails.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Copy,
  MoreVertical,
  MessageSquareQuote,
  Paperclip,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Timeline from "@/components/ui/timeline"; // Importe o componente Timeline
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import ProductTable from "./ProductTable"; // Importe o novo componente ProductTable

export const OrderDetails = () => {
  const events = [
    {
      usuario: "mateus.barros",
      data: "17/07/2024",
      hora: "13:38:58",
      campo: "XX",
      antes: "000000853",
      atual: "INCLUSAO PRE NOTA 000000853",
      status: "a classificar",
    },
    {
      usuario: "patricia.santos",
      data: "17/07/2024",
      hora: "14:35:19",
      campo: "F1_ZOBSREV",
      antes: "",
      atual:
        "Boa tarde, poderia por gentileza verificar o anexo? Não consegui abrir",
      status: "revisar",
    },
    {
      usuario: "gabriel.lemes",
      data: "17/07/2024",
      hora: "15:21:24",
      campo: "F1_ZOBSREV",
      antes:
        "Boa tarde, poderia por gentileza verificar o anexo? Não consegui abrir",
      atual: "",
      status: "revisar",
    },
    {
      usuario: "patricia.santos",
      data: "29/07/2024",
      hora: "13:00:20",
      campo: "F1_ZOBSREV",
      antes: "",
      atual: "",
      status: "classificada",
    },
  ];

  const products = [
    {
      cod: "1",
      nome: "SV-SISTEMA OPERACIONAL ERP",
      origem: "0",
      ncm: "00000000",
      qtd: "1",
      vlrUni: "7.840",
      vlrTot: "7.840",
    },
  ];

  const infos = [
    {
      created: "mateus.barros",
      classified: "patricia.santos",
      dateInclude: "17/07/2024 - 13:00:20",
      dateClassf: "29/07/2024 - 13:38:58",
    },
  ];

  return (
    <Card className="h-[97vh] flex flex-col overflow-hidden bg-card">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-2">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Nota 000000853-U
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copiar NF</span>
            </Button>
            <Badge
              variant={'default'}
              className="text-green-500 bg-transparent ring-1 ring-green-600 hover:text-green-50 hover:bg-green-700"
            >
              Classificada
            </Badge>
          </CardTitle>
          <CardDescription className="flex flex-col">
            <span>CODEART CONSULTORIA EM SOLUCOES SAAS LTDA</span>
            <span>29/07/2024</span>
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <MessageSquareQuote className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Responder
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm flex-1 overflow-y-auto">
        <Tabs defaultValue="history" className="w-full h-full justify-evenly">
          <TabsList>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="product">Produtos</TabsTrigger>
          </TabsList>
          <TabsContent value="history">
            <Timeline events={events} />
          </TabsContent>
          <TabsContent value="product">
            <ProductTable products={products} infos={infos} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="space-x-5">
          <Button variant={"secondary"}>
            <Paperclip className="h-4" /> Anexos
          </Button>
          <Button variant={"secondary"}>
            <Paperclip className="h-4" /> Rateio
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
