import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export const PaginationButtons = () => (
  <div className="flex ml-auto bg-card">
    <Button size="icon" variant="outline" className="h-6 w-6">
      <ChevronLeft className="h-3.5 w-3.5" />
      <span className="sr-only">Previous Order</span>
    </Button>
    <Button size="icon" variant="outline" className="h-6 w-6">
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="sr-only">Next Order</span>
    </Button>
  </div>
);
