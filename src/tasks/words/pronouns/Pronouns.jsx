import { useQuiz } from "../../../contexts/QuizContext";

import TaskScreen from "./TaskScreen";
import Quiz from "../../../features/quizScreen/Quiz";
import FinishScreen from "../../../components/FinishScreen";

function Pronouns() {
    const { isQuizMode, isFinished } = useQuiz();

    return (
        <>
            {!isQuizMode && !isFinished && <TaskScreen />}
            {isQuizMode && <Quiz />}
            {isFinished && <FinishScreen />}
        </>
    );
}

export default Pronouns;
