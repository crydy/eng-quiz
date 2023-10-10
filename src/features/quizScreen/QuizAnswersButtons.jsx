import { styled } from "styled-components";
import { useLang } from "../../contexts/LangContext";
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
    onConfirm,
    isConfirmVisible,

    onNext,
    isNextVisible,

    onShowRules,
    isRulesExist,
    isShowRulesVisible,
    isRulesOpened,
}) {
    const { lang } = useLang();
    const { current, questions } = useQuiz();
    const isLastQuestion = questions.length === current + 1;

    function handleNext() {
        onNext();
    }

    return (
        <AnswersButtons>
            {onConfirm && (
                <Button
                    onClick={onConfirm}
                    visible={isConfirmVisible}
                    disabled={!isConfirmVisible}
                >
                    {
                        {
                            en: "Confirm",
                            ru: "Подтвердить",
                        }[lang]
                    }
                </Button>
            )}

            {onNext && (
                <Button
                    onClick={handleNext}
                    visible={isNextVisible}
                    disabled={!isNextVisible}
                >
                    {!isLastQuestion
                        ? langPack.buttons.next[lang]
                        : langPack.buttons.finish[lang]}
                </Button>
            )}

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
