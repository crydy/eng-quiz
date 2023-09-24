import { styled } from "styled-components";
import { useQuiz } from "../../contexts/QuizContext";
import { langPack } from "../../data/langPack";
import { rem } from "../../utils/helpers";
import Button from "../../components/ui/Button";

const AnswersButtons = styled.div`
    margin-top: ${rem(22)};
    margin-bottom: ${rem(22)};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(14)};
`;

function QuizAnswersButtons({
    onNext,
    isNextVisible,
    onShowRules,
    isRulesExist,
    isShowRulesVisible,
    isRulesOpened,
}) {
    const { current, questions, lang } = useQuiz();
    const isLastQuestion = questions.length === current + 1;

    function handleNext() {
        onNext();
    }

    return (
        <AnswersButtons>
            <Button
                onClick={handleNext}
                visible={isNextVisible}
                disabled={!isNextVisible}
            >
                {!isLastQuestion
                    ? langPack.buttons.next[lang]
                    : langPack.buttons.finish[lang]}
            </Button>

            {isRulesExist && (
                <Button
                    onClick={onShowRules}
                    colorless
                    visible={isShowRulesVisible}
                    disabled={isRulesOpened}
                >
                    {langPack.buttons.modalSpecial.rulesOpen[lang]}
                </Button>
            )}
        </AnswersButtons>
    );
}

export default QuizAnswersButtons;
