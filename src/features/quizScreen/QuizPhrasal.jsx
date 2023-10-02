import { useState } from "react";
import { styled } from "styled-components";

import { useLang } from "../../contexts/LangContext";
import { useQuiz } from "../../contexts/QuizContext";
import { langPack } from "../../data/langPack";
import { assembleSentence, getRandomItem } from "../../utils/helpers";

import QuizWrapper from "./QuizWrapper";
import QuizButtons from "./QuizButtons";
import QuizAnswersButtons from "./QuizAnswersButtons";
import PhrasalQuestion from "./drag&drop/PhrasalQuestion";

const Heading = styled.h2`
    font-size: 1.8em;
`;

const PhrasalQuestionWrapper = styled.div`
    & > *:not(:last-child) {
        margin-bottom: 0.5em;
    }
`;

const ResultDisplay = styled.div`
    font-size: 1.2em;

    & > *:not(:last-child) {
        margin-bottom: 0.4em;
    }
`;

const AssembledSentence = styled.div`
    color: ${(props) =>
        props.$variant === "correct"
            ? "var(--color-text-result-correct)"
            : "var(--color-text-result-wrong)"};
    text-decoration: ${(props) =>
        props.$variant === "correct" ? "" : "line-through"};
`;

function QuizPhrasal() {
    const { lang } = useLang();
    const { current, questions, dispatch } = useQuiz();

    const { question, phraseWords, wrongWords } = questions.at(current);

    const [userSentence, setUserSentence] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const correctSentence = assembleSentence(phraseWords);
    const isCorrectAnswer = correctSentence === userSentence;
    const isLastQuestion = questions.length === current + 1;

    function handleAssemble(userSequenceArray) {
        setUserSentence(assembleSentence(userSequenceArray));
    }

    function handleDisassemble() {
        setUserSentence(null);
    }

    function handleConfirm() {
        setIsAnswered(true);

        dispatch({
            type: "quiz/questionAnswered",
            payload: {
                question,
                isCorrect: isCorrectAnswer,
                correctVariant: correctSentence,
                wrongVariant: !isCorrectAnswer ? userSentence : null,
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

    function clearStates() {
        setIsAnswered(false);
        setUserSentence(null);
    }

    return (
        <QuizWrapper>
            <Heading>{question}</Heading>

            {!isAnswered && (
                <PhrasalQuestion
                    phraseWords={phraseWords}
                    wrongWords={wrongWords}
                    onAssemble={handleAssemble}
                    onDisassemble={handleDisassemble}
                >
                    <PhrasalQuestionWrapper>
                        <PhrasalQuestion.ReceiverList
                            title={
                                {
                                    en: "Place the words in the correct order:",
                                    ru: "Расположите слова в правильном порядке:",
                                }[lang]
                            }
                            hideTitle
                        />

                        <PhrasalQuestion.TransmitterList
                            title={
                                {
                                    en: "Drag the words into the cells above:",
                                    ru: "Перетащите слова в ячейки сверху:",
                                }[lang]
                            }
                            hideTitle
                        />
                    </PhrasalQuestionWrapper>
                </PhrasalQuestion>
            )}

            {isAnswered && (
                <ResultDisplay>
                    <div>
                        <p>
                            {isCorrectAnswer
                                ? {
                                      en: "Your answer is correct:",
                                      ru: "Твой ответ правильный:",
                                  }[lang]
                                : { en: "Your answer:", ru: "Твой ответ:" }[
                                      lang
                                  ]}
                        </p>
                        <AssembledSentence
                            $variant={isCorrectAnswer ? "correct" : "wrong"}
                        >
                            {userSentence}
                        </AssembledSentence>
                    </div>

                    <div>
                        {isCorrectAnswer ? (
                            <p>
                                {getRandomItem(
                                    langPack.messages.correctAnswer[lang]
                                )}
                            </p>
                        ) : (
                            <>
                                <p>
                                    {
                                        {
                                            en: "Correct answer:",
                                            ru: "Правильный ответ:",
                                        }[lang]
                                    }
                                </p>
                                <AssembledSentence $variant="correct">
                                    {correctSentence}
                                </AssembledSentence>
                            </>
                        )}
                    </div>
                </ResultDisplay>
            )}

            <QuizButtons>
                <QuizAnswersButtons
                    onConfirm={!isAnswered && handleConfirm}
                    isConfirmVisible={userSentence}
                    onNext={isAnswered && handleNext}
                    isNextVisible={isAnswered}
                />
            </QuizButtons>
        </QuizWrapper>
    );
}

export default QuizPhrasal;
