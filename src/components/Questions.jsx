// Libs
import { useRef, useState } from "react";
import { styled } from "styled-components";
// Context and hooks
import { useQuiz } from "../contexts/QuizContext";
import { useForbidBodyScroll } from "../hooks/useForbidBodyScroll";
// Data and utils
import { langPack } from "../data/langPack";
import { rulesData } from "../data/rulesData";
import { emojis } from "../data/emojiVariants";
import { capitalize, getRandomItem, rem } from "../utils/helpers";
// Sounds
import buttonClickSound from "../assets/sounds/button-click.wav";
// Components
import VariantButton from "./ui/VariantButton";
import Button from "./ui/Button";
import Modal from "./Modal";
import Rules from "./Rules";

const StyledQuestions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(10)};

    text-align: center;
    padding: ${rem(20)} 0;

    position: relative;
    width: min(${rem(320)}, 80vw);
    left: 50%;
    transform: translateX(-50%);
`;

const Emoji = styled.div`
    font-size: ${rem(50)};
`;

const Heading = styled.h2`
    color: ${(props) =>
        props.$version === "correct"
            ? "var(--color-quiz-heading-correct)"
            : "var(--color-quiz-heading-wrong)"};

    font-size: ${rem(28)};
`;

const PartOfSpeach = styled.span`
    position: relative;

    &::before {
        content: "${(props) => props.$nature}";

        position: absolute;
        top: ${rem(-10)};
        left: 50%;
        width: max-content;
        transform: translateX(-50%);

        color: var(--color-text-part-of-speach);
        font-size: 0.4em;
        font-weight: 200;
    }
`;

const AnswersBlock = styled.div`
    margin-top: ${rem(22)};
    margin-bottom: ${rem(22)};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(14)};
`;

const ShowRulesButton = styled(Button)``;

function Questions() {
    const { current, questions, isPartsOfSpeechMarked, lang, dispatch } =
        useQuiz();

    const {
        question,
        variants,
        correctIndex,
        type: questionType,
    } = questions.at(current);

    const [isAnswered, setIsAnswered] = useState(false);
    const [userChoice, setUserChoice] = useState(null);

    const [isModalOpened, setIsModalOpened] = useState(false);
    useForbidBodyScroll(isModalOpened);

    const isCorrectAnswer = userChoice === correctIndex;
    const isLastQuestion = questions.length === current + 1;

    const audioRef = useRef(new Audio(buttonClickSound));

    function handleAnswer(index) {
        audioRef.current.play();

        const isCorrect = index === correctIndex;

        setIsAnswered(true);
        setUserChoice(index);
        dispatch({
            type: "quiz/questionAnswered",
            payload: {
                isCorrect,
                correctVariant: variants[correctIndex],
                wrongVariant: variants[index],
            },
        });
    }

    function handleNext(e) {
        clearStates();

        if (!isLastQuestion) {
            dispatch({ type: "quiz/questionSwitchedNext" });
        } else {
            dispatch({ type: "quiz/finishedQuiz" });
        }
    }

    function handleCloseModal() {
        setIsModalOpened(false);
    }

    function clearStates() {
        setIsAnswered(false);
        setUserChoice(null);
    }

    const [pronoun, sign, verb] = question.split(" ");

    return (
        <StyledQuestions>
            {!isAnswered && (
                <>
                    <Emoji>{getRandomItem(emojis.neutral)}</Emoji>
                    {!isPartsOfSpeechMarked && <h2>{question}</h2>}
                    {isPartsOfSpeechMarked && (
                        <Heading>
                            <PartOfSpeach $nature="pronoun">
                                {pronoun}
                            </PartOfSpeach>{" "}
                            {sign}{" "}
                            <PartOfSpeach $nature="verb">{verb}</PartOfSpeach>
                        </Heading>
                    )}
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
                                ? langPack.messages.correctAnswer[lang]
                                : langPack.messages.wrongAnswer[lang]
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
            <Button
                onClick={handleNext}
                visible={isAnswered}
                disabled={!isAnswered}
            >
                {!isLastQuestion
                    ? langPack.buttons.next[lang]
                    : langPack.buttons.finish[lang]}
            </Button>

            <ShowRulesButton
                onClick={() => setIsModalOpened(true)}
                colorless
                visible={isAnswered && !isCorrectAnswer}
                disabled={isModalOpened}
            >
                {langPack.buttons.modalSpecial.rulesOpen[lang]}
            </ShowRulesButton>

            {isModalOpened && (
                <Modal
                    onClose={handleCloseModal}
                    closeButtonTitle={
                        langPack.buttons.modalSpecial.rulesClose[lang]
                    }
                >
                    <Rules
                        title={capitalize(langPack.presentSimple.title[lang])}
                        subtitle={
                            langPack.presentSimple.taskSettings.types.labels[
                                questionType
                            ][lang]
                        }
                        content={
                            rulesData.presentSimpleTableData[questionType]
                                .content
                        }
                        mark={
                            rulesData.presentSimpleTableData[questionType].mark
                        }
                    />
                </Modal>
            )}
        </StyledQuestions>
    );
}

export default Questions;
