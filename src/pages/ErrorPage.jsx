import { useNavigate, useRouteError } from "react-router-dom";
import Button from "../components/ui/Button";
import { styled } from "styled-components";
import { langPack } from "../data/langPack";
import { useQuiz } from "../contexts/QuizContext";

const StyledErrorPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5em;
`;

function ErrorPage() {
    const { lang } = useQuiz();
    const navigate = useNavigate();

    const error = useRouteError();
    console.error(error);

    function handleBackToHome() {
        navigate("/");
    }

    return (
        <StyledErrorPage id="error-page">
            <h1>{langPack.errors.errorPage.title[lang]}..</h1>
            <p>{langPack.errors.errorPage.mainMessage[lang]}:</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>

            <Button onClick={handleBackToHome}>
                {langPack.buttons.backToHome[lang]}
            </Button>
        </StyledErrorPage>
    );
}

export default ErrorPage;
