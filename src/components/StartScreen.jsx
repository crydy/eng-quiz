import { styled } from "styled-components";

import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useQuiz } from "../contexts/QuizContext";
import { rem } from "../utils/helpers";
import { verbs } from "../data/words/verbs";
import { langPack } from "../data/langPack";
import { LOCAL_STORAGE_KEY as KEY } from "../config/localStorageConfig";

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
        width: calc(100% + ${rem(40)});
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
    const { lang, dispatch } = useQuiz();
    const [amount, setAmount] = useLocalStorageState(KEY.questionsAmount, "10");
    const [options, setOptions] = useLocalStorageState(KEY.questionsTypes, {
        positives: true,
        negatives: false,
        questions: false,
    });
    const [verbsVariety, setVerbsVariety] = useLocalStorageState(
        KEY.verbsVariety,
        verbs.getVariants().at(0)
    );

    const selectedOptions = Object.keys(options).filter(
        (item) => options[item] === true
    );

    const optionsLabels = Object.values(
        langPack.presentSimple.taskSettings.types.labels
    ).map((item) => item[lang]);

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
            <h1>{langPack.appTitle[lang]}</h1>
            <h2>
                - <span>{langPack.presentSimple.title[lang]}</span> -
            </h2>
            <Heading3>{langPack.presentSimple.subtitle[lang]}</Heading3>

            <RangeBlock
                title={
                    langPack.presentSimple.taskSettings
                        .questionsAmountRangeTitle[lang]
                }
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="10"
                max="40"
                trackColor="var(--color-range-track)"
                thumbColor="var(--color-range-thumb)"
            ></RangeBlock>

            <CheckboxesSet
                title={langPack.presentSimple.taskSettings.types.title[lang]}
                options={Object.keys(options)}
                labels={optionsLabels}
                selectedOptions={selectedOptions}
                onChange={handleCheckboxChange}
                sizeFont={36}
                sizeItemsGap={16}
                color="var(--color-text-main)"
            />

            <ToggleSet
                title={
                    langPack.presentSimple.taskSettings.verbsVarietyTitle[lang]
                }
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
                {langPack.buttons.start[lang]}
            </Button>
        </StyledStartScreen>
    );
}

export default StartScreen;
