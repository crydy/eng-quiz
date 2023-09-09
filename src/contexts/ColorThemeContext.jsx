import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { LOCAL_STORAGE_KEY as KEY } from "../config/localStorageConfig";
import { config } from "../config/config";

const ThemeContext = createContext(null);

function ColorThemeProvider({ children }) {
    const [colorTheme, setColorTheme] = useLocalStorageState(
        KEY.userColorTheme,
        localStorage.getItem(KEY.userColorTheme) ||
            config.colorThemes.getDefaultClassName()
    );

    useEffect(() => {
        const rootClassList = document.documentElement.classList;
        const classesToRemove = Array.from(rootClassList).filter((className) =>
            className.startsWith(config.colorThemes.classNamesPrefix)
        );
        classesToRemove.forEach((className) => {
            rootClassList.remove(className);
        });
        rootClassList.add(colorTheme);
    }, [colorTheme]);

    return (
        <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function useColorTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined)
        throw new Error(
            "useColorTheme must be used within a ColorThemeProvider"
        );
    return context;
}

export { ColorThemeProvider, useColorTheme };
