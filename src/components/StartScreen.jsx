import { useState } from "react";
import { styled } from "styled-components";

import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useQuiz } from "../contexts/QuizContext";
import { rem } from "../utils/helpers";

import Button from "./ui/Button";
import Checkbox from "./ui/Checkbox";
import RangeBlock from "./RangeBlock";

const StyledStartScreen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(40)};

    text-align: center;
`;

const Heading3 = styled.h3`
    position: relative;
    padding: ${rem(20)} ${rem(0)};

    &::before,
    &::after {
        content: "";
        position: absolute;

        left: 50%;
        width: ${rem(260)};
        height: ${rem(3)};
        background-color: var(--color-text-main);
        transform: translateX(-50%);
    }

    &::before {
        top: 0;
    }
    &::after {
        bottom: 0;
    }
`;

const OptionsForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${rem(20)};
`;

function StartScreen() {
    const { dispatch } = useQuiz();
    const [amount, setAmount] = useState(10);
    const [options, setOptions] = useLocalStorageState({
        positives: true,
        negatives: false,
        questions: false,
    });

    function handleCheckboxChange(e) {
        const { name } = e.target;

        const isLastActive =
            Object.values(options).filter(Boolean).length === 1;

        if (options[name] && isLastActive) {
            return;
        }

        setOptions({
            ...options,
            [name]: !options[name],
        });
    }

    function handleStartQuiz() {
        dispatch({
            type: "quiz/started",
            payload: { amount, options },
        });
    }

    return (
        <StyledStartScreen>
            <h1>English verbs</h1>
            <h2>- Present simple -</h2>
            <Heading3>pronoun + verb</Heading3>

            <RangeBlock
                label="Questions amount:"
                min="5"
                max="30"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            ></RangeBlock>

            <OptionsForm>
                <Checkbox
                    name="positives"
                    checked={options.positives}
                    onChange={handleCheckboxChange}
                >
                    positives
                </Checkbox>

                <Checkbox
                    name="negatives"
                    checked={options.negatives}
                    onChange={handleCheckboxChange}
                >
                    negatives
                </Checkbox>

                <Checkbox
                    name="questions"
                    checked={options.questions}
                    onChange={handleCheckboxChange}
                >
                    questions
                </Checkbox>
            </OptionsForm>

            <Button
                onClick={handleStartQuiz}
                disabled={
                    !options.positives &&
                    !options.negatives &&
                    !options.questions
                }
            >
                Start the Quiz
            </Button>
        </StyledStartScreen>
    );
}

export default StartScreen;
