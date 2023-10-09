import GlobalStyles from "../styles/GlobalStyles";

import { ColorThemeProvider } from "./ColorThemeContext";
import { LangContextProvider } from "./LangContext";
import { QuizContextProvider } from "./QuizContext";

function GlobalContexts({ children }) {
    return (
        <ColorThemeProvider>
            <LangContextProvider>
                <QuizContextProvider>
                    <GlobalStyles />
                    {children}
                </QuizContextProvider>
            </LangContextProvider>
        </ColorThemeProvider>
    );
}

export default GlobalContexts;
