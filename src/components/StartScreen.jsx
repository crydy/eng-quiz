import { styled } from "styled-components";

import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useQuiz } from "../contexts/QuizContext";
import { rem } from "../utils/helpers";
import { verbs } from "../data/words/verbs";

import Button from "./ui/Button";
import RangeBlock from "./ui/RangeBlock";
import ToggleSet from "./ui/ToggleSet";
import CheckboxesSet from "./ui/CheckboxesSet";

const StyledStartScreen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(25)};

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

function StartScreen() {
    const { dispatch } = useQuiz();
    const [amount, setAmount] = useLocalStorageState("amount", "10");
    const [options, setOptions] = useLocalStorageState("options", {
        positives: true,
        negatives: false,
        questions: false,
    });
    const [verbsVariety, setVerbsVariety] = useLocalStorageState(
        "verbs variety",
        verbs.getVariants().at(0)
    );

    const selectedOptions = Object.keys(options).filter(
        (item) => options[item] === true
    );

    function handleCheckboxChange(e) {
        const { name } = e.target;

        setOptions((options) => {
            return {
                ...options,
                [name]: !options[name],
            };
        });
    }

    function handleToggleChange(e) {
        const verbsVariety = e.target.value;
        setVerbsVariety(() => verbsVariety);
    }

    function handleStartQuiz() {
        dispatch({
            type: "quiz/started",
            payload: { amount, options, verbsVariety },
        });
    }

    return (
        <StyledStartScreen>
            <h1>English quiz</h1>
            <h2>- present simple -</h2>
            <Heading3>pronoun + verb</Heading3>

            <RangeBlock
                title="Questions amount:"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="5"
                max="30"
                trackColor="var(--color-range-track)"
                thumbColor="var(--color-range-thumb)"
            ></RangeBlock>

            <CheckboxesSet
                title="types:"
                options={Object.keys(options)}
                selectedOptions={selectedOptions}
                onChange={handleCheckboxChange}
                sizeFont={36}
                sizeItemsGap={16}
                color="var(--color-text-main)"
            />

            <ToggleSet
                title="verbs variety:"
                options={verbs.getVariants()}
                selectedOption={verbsVariety}
                onChange={handleToggleChange}
                sizeFont={30}
                sizeTitleIndent={16}
                sizeDevider={3}
                colorFill="var(--color-button-bg)"
                colorActiveFill="var(--color-text-main)"
                colorActiveText="var(--color-bg)"
                colorDevider="var(--color-bg)"
            />

            <Button
                onClick={handleStartQuiz}
                disabled={!selectedOptions.length}
            >
                Start the Quiz
            </Button>
        </StyledStartScreen>
    );
}

export default StartScreen;
