import { styled } from "styled-components";

const ButtonsBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function QuizButtons({ children }) {
    return <ButtonsBlock>{children}</ButtonsBlock>;
}

export default QuizButtons;
