import { useQuiz } from "../../../contexts/QuizContext";

import FinishScreen from "../../../features/finishScreen/FinishScreen";
import QuizPhrasal from "../../../features/quizScreen/QuizPhrasal";
import TaskScreen from "./TaskScreen";

function Questions() {
    const { isQuizMode, isFinished } = useQuiz();

    return (
        <>
            {!isQuizMode && !isFinished && <TaskScreen />}
            {isQuizMode && <QuizPhrasal />}
            {isFinished && <FinishScreen />}
        </>
    );
}

export default Questions;
