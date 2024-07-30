"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function IntroCard() {
  return (
    <Card className="h-full text-center">
      <CardHeader>
        <CardTitle  className="leading-relaxed ">Suas Pré Notas</CardTitle>
        <CardDescription className="leading-relaxed">
          Introduzindo nosso Dashboard dinâmico para gestão, inserção e
          análises detalhadas de pré notas fiscais.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-col w-full gap-4">
          <Button variant={"secondary"}>Importar XML</Button>
          <Button variant={"default"}>Inserir manualmente</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
