import { createContext, useContext, useReducer } from "react";

import { LOCAL_STORAGE_KEY as KEY } from "../config/localStorageConfig";
import { config } from "../config/config";
import { updateLangAttribute } from "../utils/helpers";

const QuizContext = createContext();

const initialState = {
    lang: localStorage.getItem(KEY.userLanguage) || config.defaultLanguage,

    isQuizMode: false,
    isFinished: false,
    isAnswered: false,

    current: 0,
    questions: [],
    answers: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "quiz/started":
            return {
                ...initialState,
                lang: state.lang,
                isQuizMode: true,
                questions: action.payload.questions,
            };

        case "quiz/questionAnswered":
            return {
                ...state,
                answers: [...state.answers, action.payload],
                isAnswered: true,
            };

        case "quiz/questionSwitchedNext":
            return {
                ...state,
                current: state.current + 1,
                isAnswered: false,
            };

        case "quiz/finishedQuiz":
            return {
                ...state,
                isQuizMode: false,
                isFinished: true,
            };

        case "quiz/startMenu":
            return { ...initialState, lang: state.lang };

        case "menu/languageChanged":
            const newLang = state.lang === "en" ? "ru" : "en";
            localStorage.setItem(KEY.userLanguage, newLang);
            updateLangAttribute(newLang);
            return { ...state, lang: newLang };

        default:
            return state;
    }
}

function QuizContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    updateLangAttribute(state.lang);

    return (
        <QuizContext.Provider value={{ ...state, dispatch }}>
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);

    if (context === undefined)
        throw new Error("useQuiz must be used within a QuizContextProvider");
    return context;
}

export { QuizContextProvider, useQuiz };
