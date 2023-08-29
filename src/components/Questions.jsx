// Libs
import { useState } from "react";
import { styled } from "styled-components";
// Components
import Button from "./ui/Button";
import VariantButton from "./ui/VariantButton";
// Context
import { useQuiz } from "../contexts/quizContext";
// Data and utils
import { emojis } from "../data/emojiVariants";
import { getRandomItem, rem } from "../utils/helpers";
import {
    correctAnswerMessages,
    wrongAnswerMessages,
} from "../data/unswerMessages";

const StyledQuestions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(20)};

    text-align: center;
    padding: ${rem(40)};
`;

const Emoji = styled.div`
    font-size: ${rem(80)};
`;

const Heading = styled.h2`
    color: ${(props) =>
        props.$version === "correct"
            ? "var(--color-quiz-heading-correct)"
            : "var(--color-quiz-heading-wrong)"};
`;

const AnswersBlock = styled.div`
    margin-top: ${rem(35)};
    margin-bottom: ${rem(30)};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(20)};
`;

function Questions() {
    const { current, questions, dispatch } = useQuiz();

    const [isAnswered, setIsAnswered] = useState(false);
    const [userChoice, setUserChoice] = useState(null);

    const { question, variants, correctIndex } = questions.at(current);
    const isCorrectAnswer = userChoice === correctIndex;
    const isLastQuestion = questions.length === current + 1;

    function handleAnswer(index) {
        setIsAnswered(true);
        setUserChoice(index);
        dispatch({
            type: "quiz/questionAnswered",
            payload: index === correctIndex,
        });
    }

    function handleNext() {
        clearStates();

        if (!isLastQuestion) {
            dispatch({ type: "quiz/questionSwitchedNext" });
        } else {
            dispatch({ type: "quiz/finishedQuiz" });
        }
    }

    function clearStates() {
        setIsAnswered(false);
        setUserChoice(null);
    }

    return (
        <StyledQuestions>
            {!isAnswered && (
                <>
                    <Emoji>{getRandomItem(emojis.neutral)}</Emoji>
                    <h2>{question}</h2>
                </>
            )}
            {isAnswered && (
                <>
                    <Emoji>
                        {isCorrectAnswer
                            ? getRandomItem(emojis.glad)
                            : getRandomItem(emojis.sad)}
                    </Emoji>
                    <Heading $version={isCorrectAnswer ? "correct" : "wrong"}>
                        {getRandomItem(
                            isCorrectAnswer
                                ? correctAnswerMessages.eng
                                : wrongAnswerMessages.eng
                        )}
                    </Heading>
                </>
            )}

            <AnswersBlock>
                {variants.map((variant, index) => (
                    <VariantButton
                        type="button"
                        onClick={() => handleAnswer(index)}
                        disabled={isAnswered}
                        version={
                            !isAnswered
                                ? "neutral"
                                : index === correctIndex
                                ? "correct"
                                : !isCorrectAnswer &&
                                  userChoice === index &&
                                  "wrong"
                        }
                        key={question + variant}
                    >
                        {variant}
                    </VariantButton>
                ))}
            </AnswersBlock>

            {
                <Button onClick={handleNext} visible={isAnswered}>
                    {!isLastQuestion ? "Next" : "Finish the Quiz"}
                </Button>
            }
        </StyledQuestions>
    );
}

export default Questions;
