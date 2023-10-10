import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { useLang } from "../../../contexts/LangContext";
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
    const { lang } = useLang();
    const { isQuizMode, dispatch } = useQuiz();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const currentPathName = useLocation().pathname;
    const isIndexPage = currentPathName === "/";

    function handleOnHomeButtonClick() {
        if (isQuizMode) {
            setIsModalOpen(true);
        } else navigateToHome();
    }

    const navigateToHome = useCallback(() => {
        setIsModalOpen(false);
        navigate("/");
        dispatch({ type: "quiz/startMenu" });
    }, [dispatch, navigate]);

    useEffect(() => {
        function handlePopState(e) {
            if (isQuizMode) {
                navigate(currentPathName); // does trigger 'blinking behavior', need better solution
                setIsModalOpen(true);
            } else navigateToHome();
        }

        window.addEventListener("popstate", handlePopState);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
        // !!! adding currentPathName in dependencies is breaking working logic
        // TODO: find better solution to prevent default 'go back' borwser button behavior
    }, [isQuizMode, navigate, navigateToHome]);

    const buttonsFontSize = ".6em";

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
