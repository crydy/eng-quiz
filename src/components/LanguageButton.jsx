import { useQuiz } from "../contexts/QuizContext";

import ToggleSet from "./ui/ToggleSet";

function LanguageButton({ size }) {
    const { lang, dispatch } = useQuiz();

    const selectedLang = lang === "en" ? "eng" : "rus";

    function handleChangeLanguage(e) {
        const value = e.target.value;

        if (value === "eng" && lang !== "en")
            dispatch({ type: "menu/languageChanged", payload: "en" });
        if (value === "rus" && lang !== "ru")
            dispatch({ type: "menu/languageChanged", payload: "ru" });
    }

    return (
        <ToggleSet
            title="app language"
            hideTitle
            options={["rus", "eng"]}
            selectedOption={selectedLang}
            onChange={handleChangeLanguage}
            sizeFont={size}
            sizeDevider={1.5}
            colorFill="var(--color-button-bg)"
            colorActiveFill="var(--color-text-main)"
            colorActiveText="var(--color-bg)"
            colorDevider="var(--color-bg)"
        />
    );
}

export default LanguageButton;
