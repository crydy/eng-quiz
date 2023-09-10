import { useEffect, useRef } from "react";
import { styled } from "styled-components";

import { useQuiz } from "../contexts/QuizContext";
import { rem } from "../utils/helpers";

const ProgressNumerical = styled.div`
    font-family: var(--font-numbers);
    text-align: right;
`;

const ProgressBar = styled.div`
    margin-top: ${rem(8)};
    width: 100%;
    height: ${rem(6)};
    background-color: var(--color-progress-bar);
    border-radius: 100px;
    overflow: hidden;
`;

const ProgressCore = styled.div`
    width: ${(props) => props.$width + "%"};

    height: 100%;
    background-color: var(--color-progress-bar-fill);
    transition: width 0.5s ease-in-out;
`;

function Progress() {
    const { questions, current, isAnswered } = useQuiz();

    const prevPercentageProgress = (current / questions.length) * 100;
    const currPercentageProgress = ((current + 1) / questions.length) * 100;

    const titleText = useRef(null);

    useEffect(() => {
        if (!titleText.current) titleText.current = document.title;

        document.title = isAnswered
            ? `${titleText.current} | - ${current + 1}/${questions.length} -`
            : `${titleText.current} | - ${current}/${questions.length} -`;

        return () => (document.title = titleText.current);
    }, [current, isAnswered, questions.length]);

    return (
        <>
            <ProgressNumerical>
                <span>{isAnswered ? current + 1 : current}</span>/
                <span>{questions.length}</span>
            </ProgressNumerical>

            <ProgressBar>
                <ProgressCore
                    $width={
                        isAnswered
                            ? currPercentageProgress
                            : prevPercentageProgress
                    }
                />
            </ProgressBar>
        </>
    );
}

export default Progress;
