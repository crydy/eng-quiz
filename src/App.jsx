// Styles
import GlobalStyles from "./styles/GlobalStyles";
// Context
import { useQuiz } from "./contexts/QuizContext";
// Components
import TopBar from "./components/layout/TopBar";
import StartScreen from "./components/StartScreen";
import FinishScreen from "./components/FinishScreen";
import Questions from "./components/Questions";

function App() {
    const { isQuizMode, isFinished } = useQuiz();
    const topBarHeight = 6;

    return (
        <>
            <GlobalStyles />
            <TopBar height={topBarHeight} />

            {!isQuizMode && !isFinished && <StartScreen />}
            {isQuizMode && <Questions />}
            {isFinished && <FinishScreen />}
        </>
    );
}

export default App;
