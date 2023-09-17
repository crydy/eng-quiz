import { useQuiz } from "../contexts/QuizContext";

import FinishScreen from "../components/FinishScreen";
import Questions from "../components/Questions";
import StartScreen from "../components/StartScreen";

function QuizPage() {
    const { isQuizMode, isFinished } = useQuiz();

    return (
        <div>
            {!isQuizMode && !isFinished && <StartScreen />}
            {isQuizMode && <Questions />}
            {isFinished && <FinishScreen />}
        </div>
    );
}

export default QuizPage;
