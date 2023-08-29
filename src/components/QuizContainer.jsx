import { styled } from "styled-components";

const StyledQuizContainer = styled.div`
    max-width: var(--size-max-width);
    margin-left: auto;
    margin-right: auto;
    /* outline: 1px solid red; */
`;

function QuizContainer({ children }) {
    return <StyledQuizContainer>{children}</StyledQuizContainer>;
}

export default QuizContainer;
