// Context and hooks
import { useQuiz } from "../../../contexts/QuizContext";
import { useLocalStorageState } from "../../../hooks/useLocalStorageState";
// Data and utils
import { LOCAL_STORAGE_KEY as KEY } from "../../../config/localStorageConfig";
import { langPack } from "../../../data/langPack";
import { verbs } from "../../../data/words/verbs";
import { constructWordsCheckingQuestionsPack } from "../../../utils/questionConstructors";
// Components
import Button from "../../../components/ui/Button";
import TaskScreenWrapper from "../../../features/taskScreen/TaskScreenWrapper";
import TaskScreenHeadings from "../../../features/taskScreen/TaskScreenHeadings";
import TaskScreenSettings from "../../../features/taskScreen/TaskScreenSettings";
import TaskScreenRange from "../../../features/taskScreen/TaskScreenRange";
import TaskScreenToggleSet from "../../../features/taskScreen/TaskScreenToggleSet";
import TaskScreenButtons from "../../../features/taskScreen/TaskScreenButtons";

function TaskScreen() {
    const { lang, dispatch } = useQuiz();
    const [amount, setAmount] = useLocalStorageState(KEY.questionsAmount, "10");

    const [wordsVariety, setwordsVariety] = useLocalStorageState(
        KEY.wordsVariety,
        verbs.getVariants().at(0)
    );

    const [isEngToRus, setIsEngToRus] = useLocalStorageState(
        KEY.isEngToRusDirection,
        true
    );

    function handleToggleChange(e) {
        const wordsVariety = e.target.value;
        setwordsVariety(() => wordsVariety);
    }

    function handleTranslationDirectionChange(e) {
        setIsEngToRus(e.target.value === "English");
    }

    function handleStartQuiz() {
        const wordsEng = verbs.common[`n${wordsVariety}`];
        const wordsRus = verbs.commonRus[`n${wordsVariety}`];

        const wordsPack = isEngToRus
            ? [wordsEng, wordsRus]
            : [wordsRus, wordsEng];

        const questions = constructWordsCheckingQuestionsPack(
            ...wordsPack,
            amount
        );

        dispatch({
            type: "quiz/started",
            payload: { questions: questions },
        });
    }

    // const en = verbs.common.n200;
    // const ru = verbs.commonRus.n200;

    // const x = en.map((word, index) => `${word}: ${ru[index]}`);
    // console.log(x);

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
                            ru: "количество вопросов",
                            en: "questions amount",
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
                            ru: "количество глаголов:",
                            en: "verbs amount:",
                        }[lang]
                    }
                    options={verbs.getVariants().slice(0, 3)}
                    selectedOption={wordsVariety}
                    onChange={handleToggleChange}
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
