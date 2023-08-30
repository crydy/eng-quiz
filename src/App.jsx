// Styles
import GlobalStyles from "./styles/GlobalStyles";
// Context
import { useQuiz } from "./contexts/QuizContext";
// Components
import QuizContainer from "./components/QuizContainer";
import StartScreen from "./components/StartScreen";
import FinishScreen from "./components/FinishScreen";
import Progress from "./components/Progress";
import Questions from "./components/Questions";

function App() {
    const { isQuizMode, isFinished } = useQuiz();

    return (
        <>
            <GlobalStyles />
            <QuizContainer>
                {!isQuizMode && !isFinished && <StartScreen />}
                {isQuizMode && (
                    <>
                        <Progress />
                        <Questions />
                    </>
                )}
                {isFinished && <FinishScreen />}
            </QuizContainer>
        </>
    );
}

export default App;
