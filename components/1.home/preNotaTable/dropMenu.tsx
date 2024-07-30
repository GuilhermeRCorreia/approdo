import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, MoreVertical } from 'lucide-react';

interface DropdownMenuActionsProps {
  notas: any; // Pode ajustar o tipo conforme necessário
  handleActionClick?: (action: string, notas: any) => void;
}

export const DropdownMenuActions = ({ notas, handleActionClick }: DropdownMenuActionsProps) => {
  const handleAction = (action: string) => {
    if (handleActionClick) {
      handleActionClick(action, notas);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className='size-[30px]'>
          <ChevronDown className='size-5'/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleAction('edit')}>Editar</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction('delete')}>Deletar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
