import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * دمج classnames بذكاء (يتعامل مع تعارضات Tailwind).
 * @example cn("px-2 px-4") → "px-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
