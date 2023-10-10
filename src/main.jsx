// Libs
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Data
import { config } from "./config/config.js";
// Components global
import App from "./App.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
// Components tasks
import Pronouns from "./tasks/words/pronouns/Pronouns.jsx";
import Verbs from "./tasks/words/verbs/Verbs.jsx";
import PronounAndVerb from "./tasks/presentSimple/pronounAndVerb/PronounAndVerb.jsx";
import Questions from "./tasks/presentSimple/questions/Questions.jsx";
import QuestionWords from "./tasks/words/questionWords/QuestionWords.jsx";
import GlobalContexts from "./contexts/GlobalContexts.jsx";

export const modules = [
    {
        path: "/",
        element: <IndexPage />,
    },

    {
        title: "words: pronouns",
        titleRu: "слова: местоимения",
        path: "pronouns/",
        element: <Pronouns />,
    },
    {
        title: "words: verbs",
        titleRu: "слова: глаголы",
        path: "verbs/",
        element: <Verbs />,
    },
    {
        title: "present simple: pronount + verb",
        titleRu: "настоящее простое: местоимение + глагол",
        path: "pronoun+verb/",
        element: <PronounAndVerb />,
    },
    {
        title: "words: questions",
        titleRu: "слова: вопросы",
        path: "question-words/",
        element: <QuestionWords />,
    },
    {
        title: "questions: past/present/future",
        titleRu: "вопросы: прошлое/настоящее/будущее",
        path: "present-tense-questions/",
        element: <Questions />,
    },
];

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            errorElement: <ErrorPage />,

            children: modules,
        },
    ],
    { basename: config.base }
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GlobalContexts>
            <RouterProvider router={router} />
        </GlobalContexts>
    </React.StrictMode>
);
