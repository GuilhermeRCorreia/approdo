// components/Timeline.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";

interface Event {
  usuario: string;
  data: string;
  hora: string;
  campo: string;
  antes: string;
  atual: string;
  status: string;
}

interface TimelineProps {
  events: Event[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "classificada":
        return (
          <Badge variant="outline" className="text-green-500 bg-transparent ring-1 ring-green-600 hover:text-green-50 hover:bg-green-700">
            Classificada
          </Badge>
        );
      case "a classificar":
        return (
          <Badge variant="outline" className="text-blue-500 bg-transparent ring-1 ring-blue-600 hover:text-blue-50 hover:bg-blue-700">
            A Classificar
          </Badge>
        );
      case "revisar":
        return (
          <Badge variant="outline" className="text-red-500 bg-transparent ring-1 ring-red-600 hover:text-red-50 hover:bg-red-700">
            Revisar
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-gray-500">
            {status}
          </Badge>
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "classificada":
        return "bg-green-500";
      case "a classificar":
        return "bg-blue-500";
      case "revisar":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="overflow-y-auto p-6 sm:p-10">
      <div className="relative pl-6 grid gap-10 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-muted-foreground/20">
        {events.map((event, index) => (
          <div key={index} className="grid gap-1 text-sm relative">
            <div className={`aspect-square w-3 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 ${getStatusColor(event.status)}`} />
            <div className="font-medium flex gap-4">
              <h1 className="font-bold font-lg">{event.usuario}</h1>{" "}
              <span>{getStatusBadge(event.status)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-muted-foreground">Data</div>
                <div>{event.data} {event.hora}</div>
              </div>
              {event.antes && (
                <div>
                  <div className="font-medium text-muted-foreground">Valor Anterior</div>
                  <div>{event.antes}</div>
                </div>
              )}
              {event.atual && (
                <div>
                  <div className="font-medium text-muted-foreground">Valor Atualizado</div>
                  <div>{event.atual}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
