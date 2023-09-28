// Libs
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Providers
import { config } from "./config/config.js";
import { QuizContextProvider } from "./contexts/QuizContext.jsx";
import { ColorThemeProvider } from "./contexts/ColorThemeContext.jsx";
// Styles
import GlobalStyles from "./styles/GlobalStyles.js";
// Components
import App from "./App.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

import Pronouns from "./tasks/words/pronouns/Pronouns.jsx";
import Verbs from "./tasks/words/verbs/Verbs.jsx";
import PronounAndVerb from "./tasks/presentSimple/pronounAndVerb/PronounAndVerb.jsx";
import Test from "./components/test/Test.jsx";

export const modules = [
    {
        path: "/",
        element: <IndexPage />,
    },

    {
        title: "learn pronouns",
        titleRu: "учить местоимения",
        path: "pronouns/",
        element: <Pronouns />,
    },
    {
        title: "learn verbs",
        titleRu: "учить глаголы",
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
        title: "TEST",
        titleRu: "TEST",
        path: "test/",
        element: <Test />,
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
        <ColorThemeProvider>
            <QuizContextProvider>
                <GlobalStyles />
                <RouterProvider router={router} />
            </QuizContextProvider>
        </ColorThemeProvider>
    </React.StrictMode>
);
