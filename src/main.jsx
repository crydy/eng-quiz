// Libs
import React from "react";
import ReactDOM from "react-dom/client";
// Providers
import { QuizContextProvider } from "./contexts/QuizContext.jsx";
import { ColorThemeProvider } from "./contexts/ColorThemeContext.jsx";
// Components
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ColorThemeProvider>
            <QuizContextProvider>
                <App />
            </QuizContextProvider>
        </ColorThemeProvider>
    </React.StrictMode>
);
