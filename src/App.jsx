// Styles
import GlobalStyles from "./styles/GlobalStyles";
// Context
import { useQuiz } from "./contexts/quizContext";
// Components
import QuizContainer from "./components/QuizContainer";
import Questions from "./components/Questions";
import StartScreen from "./components/StartScreen";
import FinishScreen from "./components/FinishScreen";
import { constructQuestions } from "./utils/helpers";
import { pronouns } from "./data/pronouns";
import { verbs } from "./data/verbs";

console.log(constructQuestions(pronouns.personal.subject, verbs.n200, 55));

function App() {
    const { isQuizMode, isFinished } = useQuiz();

    return (
        <>
            <GlobalStyles />
            <QuizContainer>
                {!isQuizMode && !isFinished && <StartScreen />}
                {isQuizMode && <Questions />}
                {isFinished && <FinishScreen />}
            </QuizContainer>
        </>
    );
}

export default App;
