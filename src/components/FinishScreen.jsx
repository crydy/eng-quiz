import { styled } from "styled-components";

import { useQuiz } from "../contexts/QuizContext";
import { getRandomItem, rem } from "../utils/helpers";

import Button from "./ui/Button";
import { langPack } from "../data/langPack";

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
    font-family: var(--font-numbers);
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
    const { lang, answers, dispatch } = useQuiz();
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
            <h1>{getRandomItem(langPack.messages.finishQuiz[lang])}</h1>

            <HeadingH2>
                - {`${langPack.finishQuiz.score[lang]} `}
                <NumericSpan $scoreColor={scoreColor}>
                    <span>{correctAmount}</span>/<span>{total}</span>
                </NumericSpan>{" "}
                -
            </HeadingH2>

            {total !== correctAmount && (
                <HeadingH2 $scoreColor={scoreColor}>
                    {langPack.finishQuiz.mistakes[lang]}
                </HeadingH2>
            )}

            <Mistakes>
                {answers
                    .filter((item) => !item.isCorrect)
                    .map((item) => (
                        <li key={item.correctVariant}>
                            <Wrong>{item.wrongVariant}</Wrong>
                            <Correct>{item.correctVariant}</Correct>
                        </li>
                    ))}
            </Mistakes>

            <Button onClick={() => dispatch({ type: "quiz/startMenu" })}>
                {langPack.buttons.restart[lang]}
            </Button>
        </StyledFinishScreen>
    );
}

export default FinishScreen;
