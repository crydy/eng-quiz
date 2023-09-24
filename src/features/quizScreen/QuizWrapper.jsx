import { styled } from "styled-components";
import { englishFontOnly } from "../../styles/styles";
import { rem } from "../../utils/helpers";

import QuizProgress from "./QuizProgress";

const StyledQuizWrapper = styled.div`
    ${englishFontOnly}

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: ${rem(10)};

    min-height: var(--size-body-height);

    text-align: center;
    padding-bottom: ${rem(20)};

    position: relative;
    width: min(${rem(320)}, 80vw);
    left: 50%;
    transform: translateX(-50%);
`;

function QuizWrapper({ children }) {
    return (
        <StyledQuizWrapper>
            <QuizProgress />
            {children}
        </StyledQuizWrapper>
    );
}

export default QuizWrapper;
