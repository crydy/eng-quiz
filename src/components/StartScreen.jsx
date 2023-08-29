import { useState } from "react";
import { styled } from "styled-components";

import { useQuiz } from "../contexts/quizContext";
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

const Amount = styled.span`
    font-family: "Share Tech Mono", monospace;
`;

function StartScreen() {
    const { dispatch } = useQuiz();
    const [amount, setAmount] = useState(30);

    return (
        <StyledStartScreen>
            <h1>English verbs pracrice quiz</h1>
            <h2>- Simple present -</h2>

            <RangeBlock>
                <label for="questionsAmount">
                    Questions amount: <Amount>{amount}</Amount>
                </label>
                <input
                    type="range"
                    id="questionsAmount"
                    name="questionsAmount"
                    min="10"
                    max="50"
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
