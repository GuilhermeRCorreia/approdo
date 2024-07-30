import React from 'react';
import {
  DropdownMenu as RadixDropdownMenu,
  DropdownMenuTrigger as RadixDropdownMenuTrigger,
  DropdownMenuContent as RadixDropdownMenuContent,
  DropdownMenuLabel as RadixDropdownMenuLabel,
  DropdownMenuItem as RadixDropdownMenuItem,
  DropdownMenuSeparator as RadixDropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button';
import { FoldHorizontalIcon } from 'lucide-react';

export function DropdownMenuActions({ notas, handleActionClick }) {
  return (
    <RadixDropdownMenu>
      <RadixDropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <FoldHorizontalIcon className="h-4 w-4" />
        </Button>
      </RadixDropdownMenuTrigger>
      <RadixDropdownMenuContent
        align="end"
        className="z-40 flex flex-col bg-card p-1 rounded-lg focus:outline-none focus:ring-0 border-border border-2"
      >
        <RadixDropdownMenuLabel>Actions</RadixDropdownMenuLabel>
        <RadixDropdownMenuItem className="menu-item" onClick={() => handleActionClick('alterar', notas)}>Alterar</RadixDropdownMenuItem>
        <RadixDropdownMenuSeparator />
        <RadixDropdownMenuItem className="menu-item" onClick={() => handleActionClick('anexo', notas)}>Anexo</RadixDropdownMenuItem>
        <RadixDropdownMenuItem className="menu-item" onClick={() => handleActionClick('excluir', notas)}>Excluir</RadixDropdownMenuItem>
        <RadixDropdownMenuItem className="menu-item" onClick={() => handleActionClick('revisar', notas)}>Revisar</RadixDropdownMenuItem>
        <RadixDropdownMenuItem className="menu-item" onClick={() => handleActionClick('historico', notas)}>Histórico</RadixDropdownMenuItem>
      </RadixDropdownMenuContent>
    </RadixDropdownMenu>
  );
}
