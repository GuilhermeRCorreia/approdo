import React from "react";
import { DrawerForm } from "./DrawerForm";
import { ThemeToggleButton } from "./ThemeToggleButton";

interface NavbarProps {
  pageTitle: string;
}

export const Navbar = ({ pageTitle }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4 w-full">
      <h1 className="text-xl font-semibold">{pageTitle}</h1>
      <DrawerForm />
      <ThemeToggleButton />
    </header>
  );
};
