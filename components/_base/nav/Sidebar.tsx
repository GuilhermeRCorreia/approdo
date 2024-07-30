import { TooltipButton } from "./TooltipButton";
import { mainMenuItems, footerMenuItems, headerMenuItems } from "./menuItems";
import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserRound } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getUsernameGlobal } from "@/lib/utils";

export const Sidebar = () => {
  const username = getUsernameGlobal();
  return (
    <aside className="flex w-fit border-r h-screen flex-col">
      <nav className="grid gap-1 p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          {headerMenuItems.map((item) => (
            <TooltipButton
              key={item.label}
              icon={item.icon}
              label={item.label}
              ariaLabel={item.ariaLabel}
              href={item.href}
              onClick={item.action}
            />
          ))}
        </Button>
      </nav>
      <nav className="grid gap-1 p-2">
        {mainMenuItems.map((item) => (
          <TooltipButton
            key={item.label}
            icon={item.icon}
            label={item.label}
            ariaLabel={item.ariaLabel}
            href={item.href}
            onClick={item.action}
          />
        ))}
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <ThemeToggleButton />
        {footerMenuItems.map((item) => (
          <TooltipButton
            key={item.label}
            icon={item.icon}
            label={item.label}
            ariaLabel={item.ariaLabel}
            href={item.href}
            onClick={item.action}
          />
        ))}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar>
                <AvatarFallback className="size-9">
                  <CircleUserRound className="text-white size-5" />
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={14}>
              <p>{username}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};
