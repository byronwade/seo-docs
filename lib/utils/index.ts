import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "./formatting";
export * from "./validation";
export * from "./seo";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
