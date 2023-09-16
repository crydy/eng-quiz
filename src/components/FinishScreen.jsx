import { styled } from "styled-components";

import { container, scrollNoBars } from "../styles/stylesPatterns";
import { useQuiz } from "../contexts/QuizContext";
import { getRandomItem, rem } from "../utils/helpers";
import { langPack } from "../data/langPack";

import Button from "./ui/Button";

const StyledFinishScreen = styled.div`
    ${container};
    height: var(--size-body-height);

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: ${rem(20)};

    padding-bottom: min(5vh, ${rem(60)});
    padding-left: 1em;
    padding-right: 1em;

    text-align: center;

    /* & > * {
        outline: 1px solid green;
    } */
`;

const HeadingsBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(15)};
    max-width: 100vw;

    color: ${(props) => props.$scoreColor};
`;

const HeadingH1 = styled.h1`
    white-space: break-spaces;
`;

const HeadingH2 = styled.h2``;
const HeadingH3 = styled.h3``;

const NumericSpan = styled.span`
    font-family: var(--font-numbers);
    font-weight: 600;

    & > span:first-child {
        color: ${(props) => props.$scoreColor};
    }
`;

const MistakesList = styled.ul`
    ${scrollNoBars};

    display: flex;
    flex-direction: column;
    gap: ${rem(8)};

    color: var(--color-text-main);

    min-width: 100%;

    & > li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        line-height: 1;
        font-size: inherit;
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
    let messageSource;
    if (scorePercentage < 33) {
        scoreColor = "var(--color-text-result-wrong)";
        messageSource = langPack.messages.finishQuiz.low[lang];
    } else if (scorePercentage < 66) {
        scoreColor = "var(--color-text-result-average)";
        messageSource = langPack.messages.finishQuiz.medium[lang];
    } else {
        scoreColor = "var(--color-text-result-correct)";
        messageSource = langPack.messages.finishQuiz.high[lang];
    }

    return (
        <StyledFinishScreen>
            <HeadingsBlock>
                <HeadingH1>{getRandomItem(messageSource)}</HeadingH1>

                <HeadingH2>
                    {`${langPack.finishQuiz.score[lang]} `}
                    <NumericSpan $scoreColor={scoreColor}>
                        <span>{correctAmount}</span>/<span>{total}</span>
                    </NumericSpan>{" "}
                </HeadingH2>
            </HeadingsBlock>

            <MistakesList>
                {total !== correctAmount && (
                    <HeadingH3 $scoreColor={scoreColor}>
                        {langPack.finishQuiz.mistakes[lang]}
                    </HeadingH3>
                )}

                {answers
                    .filter((item) => !item.isCorrect)
                    .map((item) => (
                        <li key={item.correctVariant}>
                            <Wrong>{item.wrongVariant}</Wrong>
                            <Correct>{item.correctVariant}</Correct>
                        </li>
                    ))}
            </MistakesList>

            <Button onClick={() => dispatch({ type: "quiz/startMenu" })}>
                {langPack.buttons.restart[lang]}
            </Button>
        </StyledFinishScreen>
    );
}

export default FinishScreen;
