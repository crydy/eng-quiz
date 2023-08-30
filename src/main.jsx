import React from "react";
import ReactDOM from "react-dom/client";

import { QuizContextProvider } from "./contexts/QuizContext.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QuizContextProvider>
            <App />
        </QuizContextProvider>
    </React.StrictMode>
);
