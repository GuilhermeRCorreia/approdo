import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setUsernameGlobal = (username: string) => {
  localStorage.setItem('username', username);
};

export const getUsernameGlobal = (): string => {
  return localStorage.getItem('username') || '';
};
