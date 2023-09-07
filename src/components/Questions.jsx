// Libs
import { useRef, useState } from "react";
import { styled } from "styled-components";
// Context
import { useQuiz } from "../contexts/QuizContext";
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
    gap: ${rem(20)};

    text-align: center;
    padding: ${rem(40)} 0;

    position: relative;
    width: min(320px, 80vw);
    left: 50%;
    transform: translateX(-50%);
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
    margin-top: ${rem(35)};
    margin-bottom: ${rem(30)};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(20)};
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

    const isCorrectAnswer = userChoice === correctIndex;
    const isLastQuestion = questions.length === current + 1;
    const ruleTitle = `${capitalize(langPack.presentSimple.title[lang])}: ${
        langPack.presentSimple.taskSettings.types.labels[questionType][lang]
    }`;

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

    function handleNext() {
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
                        <h2>
                            <PartOfSpeach $nature="pronoun">
                                {pronoun}
                            </PartOfSpeach>{" "}
                            {sign}{" "}
                            <PartOfSpeach $nature="verb">{verb}</PartOfSpeach>
                        </h2>
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
            <Button onClick={handleNext} visible={isAnswered}>
                {!isLastQuestion
                    ? langPack.buttons.next[lang]
                    : langPack.buttons.finish[lang]}
            </Button>

            <ShowRulesButton
                onClick={() => setIsModalOpened(true)}
                colorless
                visible={isAnswered && !isCorrectAnswer}
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
                        title={ruleTitle}
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
