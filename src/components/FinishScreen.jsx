import { styled } from "styled-components";

import { useQuiz } from "../contexts/QuizContext";
import { getRandomItem, rem } from "../utils/helpers";
import { finishScreenMessages } from "../data/messages";

import Button from "./ui/Button";

const StyledFinishScreen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(40)};

    text-align: center;
`;

const HeadingH2 = styled.h2`
    color: ${(props) => props.$scoreColor};
    text-decoration: ${(props) =>
        props.$scoreColor ? "underline" : "inherit"};
`;

const NumericSpan = styled.span`
    font-family: "Share Tech Mono", monospace;
    font-weight: 600;

    & > span:first-child {
        color: ${(props) => props.$scoreColor};
    }
`;

const Mistakes = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${rem(20)};

    color: var(--color-text-neutral);

    max-height: 40vh;
    min-width: 100%;

    overflow: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }

    & > li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        line-height: 1;
    }
`;

const Wrong = styled.span`
    color: var(--color-text-result-wrong);
    text-decoration: line-through;
`;

const Correct = styled.span`
    color: var(--color-text-result-correct);
`;

function FinishScreen() {
    const { answers, dispatch } = useQuiz();
    const correctAmount = answers.filter((item) => item.isCorrect).length;
    const total = answers.length;

    const scorePercentage = (correctAmount / total) * 100;

    let scoreColor;
    if (scorePercentage < 33) scoreColor = "var(--color-text-result-wrong)";
    else if (scorePercentage < 66)
        scoreColor = "var(--color-text-result-average)";
    else scoreColor = "var(--color-text-result-correct)";

    return (
        <StyledFinishScreen>
            <h1>{getRandomItem(finishScreenMessages)}</h1>

            <HeadingH2>
                - {"Your score: "}
                <NumericSpan $scoreColor={scoreColor}>
                    <span>{correctAmount}</span>/<span>{total}</span>
                </NumericSpan>{" "}
                -
            </HeadingH2>

            {total !== correctAmount && (
                <HeadingH2 $scoreColor={scoreColor}>Your mistakes:</HeadingH2>
            )}

            <Mistakes>
                {answers
                    .filter((item) => !item.isCorrect)
                    .map((item) => (
                        <li>
                            <Wrong>{item.wrongVariant}</Wrong>
                            <Correct>{item.correctVariant}</Correct>
                        </li>
                    ))}
            </Mistakes>

            <Button onClick={() => dispatch({ type: "quiz/startMenu" })}>
                Practice more!
            </Button>
        </StyledFinishScreen>
    );
}

export default FinishScreen;
