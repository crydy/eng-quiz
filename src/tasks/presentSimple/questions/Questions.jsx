import { useQuiz } from "../../../contexts/QuizContext";
import QuizPhrasal from "./QuizPhrasal";
import TaskScreen from "./TaskScreen";

function Questions() {
    const { isQuizMode, isFinished } = useQuiz();

    return (
        <>
            {!isQuizMode && !isFinished && <TaskScreen />}
            {isQuizMode && <QuizPhrasal />}
            {/* {isFinished && <FinishScreen />} */}
        </>
    );
}

export default Questions;
