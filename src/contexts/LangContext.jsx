import { createContext, useContext, useReducer } from "react";
import { config } from "../config/config";
import { LOCAL_STORAGE_KEY as KEY } from "../config/localStorageConfig";
import { updateLangAttribute } from "../utils/helpers";

const LangContext = createContext();

const initialState = {
    lang: localStorage.getItem(KEY.userLanguage) || config.defaultLanguage,
};

function reducer(state, action) {
    switch (action.type) {
        case "menu/languageChanged":
            const newLang = state.lang === "en" ? "ru" : "en";
            localStorage.setItem(KEY.userLanguage, newLang);
            updateLangAttribute(newLang);
            return { ...state, lang: newLang };

        default:
            return state;
    }
}

function LangContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    updateLangAttribute(state.lang);

    return (
        <LangContext.Provider value={{ ...state, dispatch }}>
            {children}
        </LangContext.Provider>
    );
}

function useLang() {
    const context = useContext(LangContext);

    if (context === undefined)
        throw new Error("useLang must be used within a LangContextProvider");
    return context;
}

export { LangContextProvider, useLang };
