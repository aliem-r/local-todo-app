import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { themes } from "./App";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function cleanText(text: string): string {
    return text.replace(/\s+/g, " ").trim();
}

export function setThemeAndGetIndex(theme: string): number {
    const validTheme = themes.includes(theme) ? theme : themes[0];
    document.documentElement.setAttribute("data-theme", validTheme);
    localStorage.setItem("theme", validTheme);
    return themes.indexOf(validTheme);
}
