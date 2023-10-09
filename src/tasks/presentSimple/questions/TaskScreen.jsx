// Context and hooks
import { useLang } from "../../../contexts/LangContext";
import { useQuiz } from "../../../contexts/QuizContext";
import { useLocalStorageState } from "../../../hooks/useLocalStorageState";
// Data and utils
import { LOCAL_STORAGE_KEY as KEY } from "../../../config/localStorageConfig";
import { config } from "../../../config/config";
import { langPack } from "../../../data/langPack";
import { constructQuestionsPack } from "../../../data/questions/questionsSimple";
// Components
import TaskScreenWrapper from "../../../features/taskScreen/TaskScreenWrapper";
import TaskScreenHeadings from "../../../features/taskScreen/TaskScreenHeadings";
import TaskScreenSettings from "../../../features/taskScreen/TaskScreenSettings";
import TaskScreenRange from "../../../features/taskScreen/TaskScreenRange";
import TaskScreenButtons from "../../../features/taskScreen/TaskScreenButtons";
import TaskScreenCheckboxes from "../../../features/taskScreen/TaskScreenCheckboxes";
import Button from "../../../components/ui/Button";

function TaskScreen() {
    const { lang } = useLang();
    const { dispatch } = useQuiz();

    const [amount, setAmount] = useLocalStorageState(
        KEY.questionsAmountHardTasks,
        config.quistionsAmountHardTasks.default
    );

    const [options, setOptions] = useLocalStorageState(
        KEY.presentSimpleQuestionTypes,
        {
            past: true,
            present: false,
            future: false,
        }
    );

    const selectedOptions = Object.keys(options).filter(
        (item) => options[item] === true
    );

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

    function handleStartQuiz() {
        dispatch({
            type: "quiz/started",
            payload: {
                questions: constructQuestionsPack(amount, selectedOptions),
            },
        });
    }

    return (
        <TaskScreenWrapper>
            <TaskScreenHeadings>
                <h2>
                    {
                        {
                            ru: "Вопросы",
                            en: "Questions",
                        }[lang]
                    }
                </h2>

                <h3>
                    {
                        {
                            ru: "простое время",
                            en: "simple tense",
                        }[lang]
                    }
                </h3>
            </TaskScreenHeadings>

            <TaskScreenSettings>
                <TaskScreenRange
                    title={
                        {
                            ru: "количество вопросов:",
                            en: "questions amount:",
                        }[lang]
                    }
                    min={config.quistionsAmountHardTasks.min}
                    max={config.quistionsAmountHardTasks.max}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                ></TaskScreenRange>

                <TaskScreenCheckboxes
                    title={{ en: "tense:", ru: "время:" }[lang]}
                    options={Object.keys(options)}
                    labels={
                        {
                            en: Object.keys(options),
                            ru: ["прошедшее", "настоящее", "будущее"],
                        }[lang]
                    }
                    selectedOptions={selectedOptions}
                    onChange={handleCheckboxChange}
                />
            </TaskScreenSettings>

            <TaskScreenButtons>
                <Button
                    onClick={handleStartQuiz}
                    disabled={selectedOptions.length < 1}
                >
                    {langPack.buttons.start[lang]}
                </Button>
            </TaskScreenButtons>
        </TaskScreenWrapper>
    );
}

export default TaskScreen;
