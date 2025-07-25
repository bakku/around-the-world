import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import path from "path";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fromRootPath(...paths: string[]) {
  return path.join(__dirname, "..", "..", ...paths);
}

export function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
