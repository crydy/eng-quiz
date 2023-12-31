import { useNavigate, useRouteError } from "react-router-dom";
import { styled } from "styled-components";

import { useLang } from "../contexts/LangContext";
import { langPack } from "../data/langPack";

import Button from "../components/ui/Button";

const StyledErrorPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5em;
`;

const StyledErrorText = styled.p`
    max-width: 70vw;
`;

function ErrorPage() {
    const { lang } = useLang();
    const navigate = useNavigate();

    const error = useRouteError();
    console.error(error);

    function handleBackToHome() {
        navigate("/");
    }

    return (
        <StyledErrorPage id="error-page">
            <h1>{langPack.errors.errorPage.title[lang]}..</h1>
            <StyledErrorText>
                {langPack.errors.errorPage.mainMessage[lang]}:
            </StyledErrorText>
            <StyledErrorText>
                <i>{error.statusText || error.message}</i>
            </StyledErrorText>

            <Button onClick={handleBackToHome}>
                {langPack.buttons.backToHome[lang]}
            </Button>
        </StyledErrorPage>
    );
}

export default ErrorPage;
