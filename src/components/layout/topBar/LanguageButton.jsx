import { styled } from "styled-components";
import { useLang } from "../../../contexts/LangContext";
import { englishFontOnly } from "../../../styles/styles";

import ToggleSet from "../../ui/ToggleSet";

const StyledLanguageButton = styled.div`
    ${englishFontOnly}
`;

function LanguageButton({ size }) {
    const { lang, dispatch } = useLang();

    const selectedLang = lang === "en" ? "eng" : "rus";

    function handleChangeLanguage(e) {
        const value = e.target.value;

        if (value === "eng" && lang !== "en")
            dispatch({ type: "menu/languageChanged", payload: "en" });
        if (value === "rus" && lang !== "ru")
            dispatch({ type: "menu/languageChanged", payload: "ru" });
    }

    return (
        <StyledLanguageButton>
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
        </StyledLanguageButton>
    );
}

export default LanguageButton;
