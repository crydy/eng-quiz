import { styled } from "styled-components";
import { getRandomItem, rem } from "../../utils/helpers";
import { emojis } from "../../data/emojiVariants";
import { langPack } from "../../data/langPack";

const QuestionBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${rem(20)};
`;

const Emoji = styled.div`
    font-size: 3.5em;
    opacity: ${(props) => (props.$muted ? ".3" : "1")};
`;

const Heading = styled.h2`
    color: ${(props) =>
        props.$version === "correct"
            ? "var(--color-quiz-heading-correct)"
            : "var(--color-quiz-heading-wrong)"};

    font-size: 1.8em;
`;

function QuizQuestionBlock({ lang, isAnswered, isCorrectAnswer, children }) {
    return (
        <QuestionBlock>
            <Emoji $muted={!isAnswered}>
                {!isAnswered
                    ? getRandomItem(emojis.neutral)
                    : isCorrectAnswer
                    ? getRandomItem(emojis.glad)
                    : getRandomItem(emojis.sad)}
            </Emoji>

            {!isAnswered ? (
                <Heading>{children}</Heading>
            ) : (
                <Heading $version={isCorrectAnswer ? "correct" : "wrong"}>
                    {getRandomItem(
                        isCorrectAnswer
                            ? langPack.messages.correctAnswer[lang]
                            : langPack.messages.wrongAnswer[lang]
                    )}
                </Heading>
            )}
        </QuestionBlock>
    );
}

export default QuizQuestionBlock;
