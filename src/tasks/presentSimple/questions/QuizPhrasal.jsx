import { useState } from "react";
import { useLang } from "../../../contexts/LangContext";
import { useQuiz } from "../../../contexts/QuizContext";

import QuizWrapper from "../../../features/quizScreen/QuizWrapper";
import PhrasalQuestion from "../../../components/test/PhrasalQuestion";
import { styled } from "styled-components";

const Heading = styled.h2`
    font-size: 1.8em;
`;

function QuizPhrasal() {
    const { lang } = useLang();
    const { current, questions, dispatch } = useQuiz();

    const { question, phraseWords, wrongWords } = questions.at(current);

    const [isAnswered, setIsAnswered] = useState(false);
    const [userChoice, setUserChoice] = useState(null);

    return (
        <QuizWrapper>
            <Heading>{question}</Heading>

            <PhrasalQuestion phraseWords={phraseWords} wrongWords={wrongWords}>
                <PhrasalQuestion.ReceiverList />
                <PhrasalQuestion.TransmitterList />
            </PhrasalQuestion>
        </QuizWrapper>
    );
}

export default QuizPhrasal;
