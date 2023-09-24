import { useState } from "react";

import { useQuiz } from "../../contexts/QuizContext";
import { useSound } from "../../hooks/useSound";
import { useModalState } from "../../hooks/useModalState";

import QuizWrapper from "./QuizWrapper";
import QuizQuestionBlock from "./QuizQuestionBlock";
import QuizButtons from "./QuizButtons";
import QuizVariantsButtons from "./QuizVariantsButtons";
import QuizVariantButton from "./QuizVariantButton";
import QuizAnswersButtons from "./QuizAnswersButtons";
import QuizQuestionWithPartsOfSpeach from "./QuizQuestionWithPartsOfSpeach";

function Quiz({ partsOfSpeach, modal: RulesModal }) {
    const { current, questions, lang, dispatch } = useQuiz();
    const { soundCorrect } = useSound();

    const { question, variants, correctIndex } = questions.at(current);

    const [isAnswered, setIsAnswered] = useState(false);
    const [userChoice, setUserChoice] = useState(null);

    const [isModalOpen, setisModalOpen] = useModalState(false);

    const isCorrectAnswer = userChoice === correctIndex;
    const isLastQuestion = questions.length === current + 1;

    function handleAnswer(index) {
        soundCorrect();

        const isCorrect = index === correctIndex;

        setIsAnswered(true);
        setUserChoice(index);
        dispatch({
            type: "quiz/questionAnswered",
            payload: {
                question,
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

    function clearStates() {
        setIsAnswered(false);
        setUserChoice(null);
    }

    return (
        <QuizWrapper>
            <QuizQuestionBlock
                lang={lang}
                isAnswered={isAnswered}
                isCorrectAnswer={isCorrectAnswer}
            >
                {partsOfSpeach ? (
                    <QuizQuestionWithPartsOfSpeach
                        partsOfSpeach={partsOfSpeach}
                    >
                        {question}
                    </QuizQuestionWithPartsOfSpeach>
                ) : (
                    question
                )}
            </QuizQuestionBlock>

            <QuizButtons>
                <QuizVariantsButtons>
                    {variants.map((variant, index) => (
                        <QuizVariantButton
                            key={question + variant}
                            onClick={() => handleAnswer(index)}
                            isAnswered={isAnswered}
                            isCorrectVersion={index === correctIndex}
                            isWrongVersion={
                                !isCorrectAnswer && userChoice === index
                            }
                        >
                            {variant}
                        </QuizVariantButton>
                    ))}
                </QuizVariantsButtons>

                <QuizAnswersButtons
                    onNext={handleNext}
                    onShowRules={() => setisModalOpen(true)}
                    isNextVisible={isAnswered}
                    isRulesExist={Boolean(RulesModal)}
                    isShowRulesVisible={isAnswered && !isCorrectAnswer}
                    isRulesOpened={isModalOpen}
                />
            </QuizButtons>

            {RulesModal && (
                <RulesModal
                    isModalOpen={isModalOpen}
                    onClose={() => setisModalOpen(false)}
                />
            )}
        </QuizWrapper>
    );
}

export default Quiz;
