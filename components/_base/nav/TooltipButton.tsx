import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

interface TooltipButtonProps {
  icon: LucideIcon;
  label: string;
  ariaLabel: string;
  href?: string;
  onClick?: () => void;
}

export const TooltipButton = ({ icon: Icon, label, ariaLabel, href, onClick }: TooltipButtonProps) => {
  const content = (
    <Button variant="ghost" size="icon" aria-label={ariaLabel} onClick={onClick}>
      <Icon className="size-5" />
    </Button>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {href ? <Link href={href}>{content}</Link> : content}
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={14}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
};
