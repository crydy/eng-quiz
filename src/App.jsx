// Styles
import GlobalStyles from "./styles/GlobalStyles";
// Context
import { useQuiz } from "./contexts/QuizContext";
// Components
import QuizContainer from "./components/QuizContainer";
import Questions from "./components/Questions";
import StartScreen from "./components/StartScreen";
import FinishScreen from "./components/FinishScreen";

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
