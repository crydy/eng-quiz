import { createContext, useContext, useReducer } from "react";

// QUESTIONS STRUCTURE EXAMPLE
// const testQuestions = [
//     {
//         question: "Who can run?",
//         variants: ["turtle", "cat", "worm", "flower"],
//         correctIndex: 1,
//     },
//     {
//         question: "Are you an animal?",
//         variants: ["Absolutely", "I am the god"],
//         correctIndex: 0,
//     },
// ];

// const testPhraseQuestions = [
//     {
//         question: "Put the words in the correct order",
//         phraseWords: ["have", "you", "seen", "her", "?"],
//         wrongWords: ["did", "were", "see", "was"],
//     },
// ];

const QuizContext = createContext();

const initialState = {
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
            return { ...initialState };

        default:
            return state;
    }
}

function QuizContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

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
