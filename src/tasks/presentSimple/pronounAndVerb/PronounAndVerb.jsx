// Libs
import { createContext, useState } from "react";
// Context and hooks
import { useLang } from "../../../contexts/LangContext";
import { useQuiz } from "../../../contexts/QuizContext";
import { useLocalStorageState } from "../../../hooks/useLocalStorageState";
import { useModalState } from "../../../hooks/useModalState";
// Data and utils
import { LOCAL_STORAGE_KEY as KEY } from "../../../config/localStorageConfig";
import { config } from "../../../config/config";
import { verbs } from "../../../data/words/verbs";
import { langPack } from "../../../data/langPack";
import { pronouns } from "../../../data/words/pronouns";
import { constructQuestions } from "../../../utils/questionConstructors";
// Components
import TaskScreen from "./TaskScreen";
import FinishScreen from "../../../features/finishScreen/FinishScreen";
import Quiz from "../../../features/quizScreen/Quiz";
import QuizModal from "./QuizModal";

export const PronounAndVerbContext = createContext();

function PronounAndVerb() {
    const { lang } = useLang();
    const { isQuizMode, isFinished, dispatch } = useQuiz();

    const [amount, setAmount] = useLocalStorageState(
        KEY.questionsAmount,
        config.quistionsAmount.default
    );
    const [options, setOptions] = useLocalStorageState(
        KEY.pronAndVerbQuestionsTypes,
        {
            positives: true,
            negatives: false,
            questions: false,
        }
    );

    const [verbsVariety, setVerbsVariety] = useLocalStorageState(
        KEY.verbsVariety,
        verbs.getVariants().at(0)
    );
    const [isRulesOpened, setIsRulesOpened] = useModalState(false);
    const [isQuizRulesOpen, setIsQuizRulesOpen] = useState(false);

    const selectedOptions = Object.keys(options).filter(
        (item) => options[item] === true
    );

    const optionsLabels = Object.values(
        langPack.presentSimple.taskSettings.types.labels
    ).map((item) => item[lang]);

    function handleCheckboxChange(e) {
        const { name, checked } = e.target;

        // keep at least one checkbox active
        if (!checked && Object.values(options).filter(Boolean).length === 1) {
            return;
        }

        setOptions((options) => {
            return {
                ...options,
                [name]: !options[name],
            };
        });
    }

    function handleToggleChange(e) {
        const verbsVariety = e.target.value;
        setVerbsVariety(() => verbsVariety);
    }

    function handleOpenRules() {
        setIsRulesOpened(true);
    }

    function handleStartQuiz() {
        const questions = constructQuestions(
            pronouns.personal.subject,
            verbs.common[`n${verbsVariety}`],
            amount,
            options
        );

        dispatch({
            type: "quiz/started",
            payload: { questions },
        });
    }

    return (
        <PronounAndVerbContext.Provider
            value={{
                amount,
                setAmount,
                options,
                selectedOptions,
                optionsLabels,
                verbsVariety,
                isRulesOpened,
                setIsRulesOpened,
                handleCheckboxChange,
                handleToggleChange,
                handleOpenRules,
                handleStartQuiz,
                isQuizRulesOpen,
                setIsQuizRulesOpen,
            }}
        >
            <>
                {!isQuizMode && !isFinished && <TaskScreen />}
                {isQuizMode && (
                    <Quiz
                        partsOfSpeach={["pronoun", "verb"]}
                        modal={QuizModal}
                    />
                )}
                {isFinished && <FinishScreen />}
            </>
        </PronounAndVerbContext.Provider>
    );
}

export default PronounAndVerb;
