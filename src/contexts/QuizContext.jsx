import { createContext, useContext, useReducer } from "react";
import { pronouns } from "../data/pronouns";
import { verbs } from "../data/verbs";
import { constructQuestions } from "../utils/helpers";

const QuizContext = createContext();

// const testQuestions = [
//     {
//         question: "Who can run?",
//         variants: ["turtle", "cat", "worm", "flower"],
//         correctIndex: 1,
//     },
//     {
//         question: "Are you animal?",
//         variants: ["Absolutely", "I am the god"],
//         correctIndex: 0,
//     },
// ];

const initialState = {
    isQuizMode: false,
    isFinished: false,
    current: 0,
    questions: [],
    answers: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "quiz/started":
            return {
                ...initialState,
                isQuizMode: true,
                questions: constructQuestions(
                    pronouns.personal.subject,
                    verbs.n200,
                    action.payload
                ),
            };

        case "quiz/questionAnswered":
            return {
                ...state,
                answers: [...state.answers, action.payload],
            };

        case "quiz/questionSwitchedNext":
            return {
                ...state,
                current: state.current + 1,
            };

        case "quiz/finishedQuiz":
            return {
                ...state,
                isQuizMode: false,
                isFinished: true,
            };

        case "quiz/startMenu":
            return { ...initialState };

        default:
            return state;
    }
}

function QuizContextProvider({ children }) {
    const [{ isQuizMode, isFinished, current, questions }, dispatch] =
        useReducer(reducer, initialState);

    return (
        <QuizContext.Provider
            value={{
                isQuizMode,
                isFinished,
                current,
                questions,
                dispatch,
            }}
        >
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
