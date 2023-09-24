// Context and hooks
import { useQuiz } from "../../../contexts/QuizContext";
import { useLocalStorageState } from "../../../hooks/useLocalStorageState";
// Data and utils
import { LOCAL_STORAGE_KEY as KEY } from "../../../config/localStorageConfig";
import { config } from "../../../config/config";
import { pronouns } from "../../../data/words/pronouns";
import { langPack } from "../../../data/langPack";
import { constructWordsCheckingQuestionsPack as constructQuestions } from "../../../utils/questionConstructors";
// Components
import TaskScreenWrapper from "../../../features/taskScreen/TaskScreenWrapper";
import TaskScreenHeadings from "../../../features/taskScreen/TaskScreenHeadings";
import TaskScreenSettings from "../../../features/taskScreen/TaskScreenSettings";
import TaskScreenRange from "../../../features/taskScreen/TaskScreenRange";
import TaskScreenToggleSet from "../../../features/taskScreen/TaskScreenToggleSet";
import TaskScreenButtons from "../../../features/taskScreen/TaskScreenButtons";
import Button from "../../../components/ui/Button";

function TaskScreen() {
    const { lang, dispatch } = useQuiz();

    const [amount, setAmount] = useLocalStorageState(
        KEY.questionsAmount,
        config.quistionsAmount.default
    );

    const pronounVariants = Object.keys(pronouns.personal);
    const [pronounsVariant, setPronounsVariant] = useLocalStorageState(
        KEY.pronounsVariant,
        pronounVariants.at(0)
    );

    const [isEngToRus, setIsEngToRus] = useLocalStorageState(
        KEY.isEngToRusDirection,
        true
    );

    function handleTranslationDirectionChange(e) {
        setIsEngToRus(e.target.value === "English");
    }

    function handleChangeVariant(e) {
        setPronounsVariant(e.target.value);
    }

    function handleStartQuiz() {
        const wordsEng = pronouns.personal[pronounsVariant];
        const wordsRus = pronouns.personalRus[pronounsVariant];

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
                            ru: "Английские местоимения",
                            en: "English pronouns",
                        }[lang]
                    }
                </h2>

                <h3>
                    {
                        {
                            ru: "личные",
                            en: "personal",
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

                <TaskScreenToggleSet
                    title={
                        {
                            ru: "типы местоимений:",
                            en: "types of pronouns:",
                        }[lang]
                    }
                    options={pronounVariants}
                    selectedOption={pronounVariants.at(0)}
                    onChange={handleChangeVariant}
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
