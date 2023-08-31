import { useState } from "react";
import { styled } from "styled-components";

import { useQuiz } from "../contexts/QuizContext";
import { rem } from "../utils/helpers";

import Button from "./ui/Button";

const StyledStartScreen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(40)};

    text-align: center;
`;

const RangeBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > input {
        width: 100%;
    }
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

const Amount = styled.span`
    font-family: "Share Tech Mono", monospace;
`;

function StartScreen() {
    const { dispatch } = useQuiz();
    const [amount, setAmount] = useState(10);

    return (
        <StyledStartScreen>
            <h1>English verbs</h1>
            <h2>- Present simple -</h2>
            <Heading3>pronoun + verb</Heading3>

            <RangeBlock>
                <label htmlFor="questionsAmount">
                    Questions amount: <Amount>{amount}</Amount>
                </label>
                <input
                    type="range"
                    id="questionsAmount"
                    name="questionsAmount"
                    min="5"
                    max="30"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </RangeBlock>

            <Button
                onClick={() =>
                    dispatch({ type: "quiz/started", payload: amount })
                }
            >
                Start
            </Button>
        </StyledStartScreen>
    );
}

export default StartScreen;
