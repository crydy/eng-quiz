// Context and hooks
import { useLang } from "../../../contexts/LangContext";
import { useQuiz } from "../../../contexts/QuizContext";
import { useLocalStorageState } from "../../../hooks/useLocalStorageState";
// Data and utils
import { LOCAL_STORAGE_KEY as KEY } from "../../../config/localStorageConfig";
import { config } from "../../../config/config";
import { langPack } from "../../../data/langPack";
import { verbs } from "../../../data/words/verbs";
import { constructWordsCheckingQuestionsPack as constructQuestions } from "../../../utils/questionConstructors";
// Components
import TaskScreenWrapper from "../../../features/taskScreen/TaskScreenWrapper";
import TaskScreenHeadings from "../../../features/taskScreen/TaskScreenHeadings";
import TaskScreenSettings from "../../../features/taskScreen/TaskScreenSettings";
import TaskScreenRange from "../../../features/taskScreen/TaskScreenRange";
import TaskScreenToggleSet from "../../../features/taskScreen/TaskScreenToggleSet";
import TaskScreenButtons from "../../../features/taskScreen/TaskScreenButtons";
import Button from "../../../components/ui/Button";
import { questionWords } from "../../../data/words/questionWords";

function TaskScreen() {
    const { lang } = useLang();
    const { dispatch } = useQuiz();
    const [amount, setAmount] = useLocalStorageState(
        KEY.questionsAmount,
        config.quistionsAmount.default
    );

    const [isEngToRus, setIsEngToRus] = useLocalStorageState(
        KEY.isEngToRusDirection,
        true
    );

    function handleTranslationDirectionChange(e) {
        setIsEngToRus(e.target.value === "English");
    }

    function handleStartQuiz() {
        const wordsEng = questionWords.basic.en;
        const wordsRus = questionWords.basic.ru;

        const wordsPack = isEngToRus
            ? [wordsEng, wordsRus]
            : [wordsRus, wordsEng];

        const questions = constructQuestions(...wordsPack, amount);

        dispatch({
            type: "quiz/started",
            payload: { questions: questions },
        });
    }

    return (
        <TaskScreenWrapper>
            <TaskScreenHeadings>
                <h2>
                    {
                        {
                            ru: "Английские глаголы",
                            en: "English verbs",
                        }[lang]
                    }
                </h2>
            </TaskScreenHeadings>

            <TaskScreenSettings>
                <TaskScreenRange
                    title={
                        {
                            ru: "количество вопросов:",
                            en: "questions amount:",
                        }[lang]
                    }
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                ></TaskScreenRange>

                <TaskScreenToggleSet
                    title={
                        {
                            ru: "переводить с:",
                            en: "translate from:",
                        }[lang]
                    }
                    options={["English", "Russian"]}
                    selectedOption={isEngToRus ? "English" : "Russian"}
                    onChange={handleTranslationDirectionChange}
                />
            </TaskScreenSettings>

            <TaskScreenButtons>
                <Button onClick={handleStartQuiz}>
                    {langPack.buttons.start[lang]}
                </Button>
            </TaskScreenButtons>
        </TaskScreenWrapper>
    );
}

export default TaskScreen;
