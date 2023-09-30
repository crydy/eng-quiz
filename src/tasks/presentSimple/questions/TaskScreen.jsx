// Context and hooks
import { useLang } from "../../../contexts/LangContext";
import { useQuiz } from "../../../contexts/QuizContext";
import { useLocalStorageState } from "../../../hooks/useLocalStorageState";
// Data and utils
import { LOCAL_STORAGE_KEY as KEY } from "../../../config/localStorageConfig";
import { config } from "../../../config/config";
import { langPack } from "../../../data/langPack";
// Components
import TaskScreenWrapper from "../../../features/taskScreen/TaskScreenWrapper";
import TaskScreenHeadings from "../../../features/taskScreen/TaskScreenHeadings";
import TaskScreenSettings from "../../../features/taskScreen/TaskScreenSettings";
import TaskScreenRange from "../../../features/taskScreen/TaskScreenRange";
import TaskScreenButtons from "../../../features/taskScreen/TaskScreenButtons";
import Button from "../../../components/ui/Button";

function TaskScreen() {
    const { lang } = useLang();
    const { dispatch } = useQuiz();

    const [amount, setAmount] = useLocalStorageState(
        KEY.questionsAmount,
        config.quistionsAmount.default
    );

    function handleStartQuiz() {
        // const wordsEng = pronouns.personal[pronounsVariant];
        // const wordsRus = pronouns.personalRus[pronounsVariant];
        // const wordsPack = isEngToRus
        //     ? [wordsEng, wordsRus]
        //     : [wordsRus, wordsEng];
        // const questions = constructQuestions(...wordsPack, amount);

        const testPhraseQuestions = [
            {
                question: "Put the words in the correct order",
                phraseWords: ["will", "we", "eat", "that", "?"],
                wrongWords: [],
            },
            {
                question: "Put the words in the correct order",
                phraseWords: ["have", "you", "seen", "her", "?"],
                wrongWords: ["did", "were", "see", "was"],
            },
        ];

        dispatch({
            type: "quiz/started",
            payload: { questions: testPhraseQuestions },
        });
    }

    return (
        <TaskScreenWrapper>
            <TaskScreenHeadings>
                <h2>
                    {
                        {
                            ru: "Аглийские вопросы",
                            en: "English questions",
                        }[lang]
                    }
                </h2>

                <h3>
                    {
                        {
                            ru: "порядок слов",
                            en: "words order",
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
