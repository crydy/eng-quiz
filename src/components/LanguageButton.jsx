import { styled } from "styled-components";
import { rem } from "../utils/helpers";
import { useQuiz } from "../contexts/QuizContext";

import ButtonRound from "./ui/ButtonRound";

const LangButton = styled(ButtonRound)`
    position: absolute;
    right: ${rem(14)};
    top: ${rem(14)};
    font-size: ${rem(22)};
`;

function LanguageButton() {
    const { lang, dispatch } = useQuiz();

    function handleClick() {
        dispatch({ type: "menu/languageChanged", payload: "eng" });
    }

    return (
        <LangButton onClick={handleClick}>
            {lang === "eng" ? "русское меню" : "eng menu"}
        </LangButton>
    );
}

export default LanguageButton;
