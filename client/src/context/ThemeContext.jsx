import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");

        if (saved) {
            return saved === "dark";
        }

        return window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
    });

    useEffect(() => {
        localStorage.setItem(
            "theme",
            darkMode ? "dark" : "light"
        );
        document.body.classList.remove("light-theme", "dark-theme");
        document.body.classList.add(
            darkMode ? "dark-theme" : "light-theme"
        );
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () =>
    useContext(ThemeContext);