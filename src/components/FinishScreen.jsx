import { styled } from "styled-components";
import { useQuiz } from "../contexts/quizContext";
import { rem } from "../utils/helpers";
import Button from "./ui/Button";

const StyledFinishScreen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(40)};

    text-align: center;
`;

function FinishScreen() {
    const { dispatch } = useQuiz();

    return (
        <StyledFinishScreen>
            <h1>Finish Screen</h1>
            <Button onClick={() => dispatch({ type: "quiz/startMenu" })}>
                Practice more!
            </Button>
        </StyledFinishScreen>
    );
}

export default FinishScreen;
