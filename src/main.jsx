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
import ErrorPage from "./pages/ErrorPage.jsx";
import App from "./App.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import PresSimPronounVerb from "./pages/PresSimPronounVerb.jsx";
import Pronouns from "./pages/Pronouns.jsx";

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
        title: "learn first 50 verbs",
        titleRu: "учить первые 50 глаголов",
        path: "verbs50/",
        element: <ErrorPage />,
    },
    {
        title: "present simple: pronount + verb",
        titleRu: "настоящее простое: местоимение + глагол",
        path: "pronoun+verb/",
        element: <PresSimPronounVerb />,
    },
    {
        title: "learn more verbs",
        titleRu: "учить больше глаголов",
        path: "verbs50/",
        element: <ErrorPage />,
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
