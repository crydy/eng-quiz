import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { useQuiz } from "../../../contexts/QuizContext";
import { langPack } from "../../../data/langPack";
import { container } from "../../../styles/styles";

import ColorThemeSwitcher from "./ColorThemeSwitcher";
import LanguageButton from "./LanguageButton";
import Button from "../../ui/Button";
import ModalConfirm from "../modal/ModalConfirm";

const StyledTopBar = styled.div`
    ${container};

    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-left: 0.5em;
    padding-right: 0.5em;

    width: 100vw;
    height: var(--size-top-bar-height);
`;

function TopBar() {
    const { isQuizMode, lang, dispatch } = useQuiz();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const isIndexPage = useLocation().pathname === "/";

    const buttonsFontSize = ".6em";

    function handleOnHomeButtonClick() {
        if (isQuizMode) {
            setIsModalOpen(true);
        } else navigateToHome();
    }

    function navigateToHome() {
        setIsModalOpen(false);
        navigate("/");
        dispatch({ type: "quiz/startMenu" });
    }

    return (
        <StyledTopBar>
            <ColorThemeSwitcher size={buttonsFontSize} />

            {!isIndexPage && (
                <Button
                    sizeFont={buttonsFontSize}
                    sizePadding="0.35em 0.8em"
                    onClick={handleOnHomeButtonClick}
                    disabled={isModalOpen}
                >
                    {langPack.buttons.backToHome[lang]}
                </Button>
            )}

            <LanguageButton size={buttonsFontSize} />

            {isModalOpen && (
                <ModalConfirm
                    onConfirm={navigateToHome}
                    onClose={() => setIsModalOpen(false)}
                >
                    {langPack.buttons.backToHome.modalMessage[lang]}
                </ModalConfirm>
            )}
        </StyledTopBar>
    );
}

export default TopBar;
