import { IconSquareRoundedPlus2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { themes } from "../App";
import { setThemeAndGetIndex } from "../utils";

export default function Header() {
    const [themeIndex, setThemeIndex] = useState(0);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        const preferedTheme = storedTheme
            ? storedTheme
            : prefersDark
              ? "dark"
              : "light";

        const index = setThemeAndGetIndex(preferedTheme);
        setThemeIndex(index);

        // Sync across tabs via storage event
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "theme") {
                const newTheme = e.newValue || "light";
                const newIndex = setThemeAndGetIndex(newTheme);
                setThemeIndex(newIndex);
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const handleTheme = () => {
        const nextTheme = (themeIndex + 1) % themes.length;
        const index = setThemeAndGetIndex(themes[nextTheme]);
        setThemeIndex(index);
    };

    return (
        <header>
            <div>
                <IconSquareRoundedPlus2 stroke={2.5} />
                <h1>Simple to-do list</h1>
            </div>
            <button onClick={handleTheme}></button>
        </header>
    );
}
