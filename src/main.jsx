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
import QuizPage from "./pages/QuizPage.jsx";
import IndexPage from "./pages/IndexPage.jsx";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            errorElement: <ErrorPage />,

            children: [
                {
                    path: "/",
                    element: <IndexPage />,
                },
                {
                    path: "quiz/",
                    element: <QuizPage />,
                },
            ],
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
