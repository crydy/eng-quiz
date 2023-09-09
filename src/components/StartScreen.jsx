import { useState } from "react";
import { styled } from "styled-components";

import { LOCAL_STORAGE_KEY as KEY } from "../config/localStorageConfig";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useQuiz } from "../contexts/QuizContext";
import { capitalize, rem } from "../utils/helpers";
import { verbs } from "../data/words/verbs";
import { langPack } from "../data/langPack";

import Button from "./ui/Button";
import RangeBlock from "./ui/RangeBlock";
import ToggleSet from "./ui/ToggleSet";
import CheckboxesSet from "./ui/CheckboxesSet";
import Modal from "./Modal";
import Rules from "./Rules";
import { rulesData } from "../data/rulesData";

const StyledStartScreen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(1.7rem, 3.2vh, 4rem);
    /* gap: ${rem(22)}; */

    text-align: center;
`;

const Heading1 = styled.h1`
    line-height: 1;
`;

const Heading3 = styled.h3`
    position: relative;
    padding: ${rem(10)} ${rem(0)};

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

const ButtonsBlock = styled.div`
    display: flex;
    gap: ${rem(20)};
`;

const RulesModalHeader = styled.h3`
    font-size: ${rem(50)};
    margin-top: ${rem(25)};
    margin-bottom: ${rem(25)};
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
    const [isRulesOpened, setIsRulesOpened] = useState(false);

    const selectedOptions = Object.keys(options).filter(
        (item) => options[item] === true
    );

    const optionsLabels = Object.values(
        langPack.presentSimple.taskSettings.types.labels
    ).map((item) => item[lang]);

    const rulesDataTypes = selectedOptions;
    // const rulesDataTypes = Object.keys(rulesData.presentSimple);

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

    function handleOpenRules() {
        setIsRulesOpened(true);
    }

    function handleStartQuiz() {
        dispatch({
            type: "quiz/started",
            payload: { amount, options, verbsVariety },
        });
    }

    return (
        <StyledStartScreen>
            <Heading1>{langPack.appTitle[lang]}</Heading1>
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
                sizeItemsGap={10}
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

            <ButtonsBlock>
                <Button
                    onClick={handleOpenRules}
                    disabled={!selectedOptions.length || isRulesOpened}
                    colorless
                >
                    {langPack.buttons.modalSpecial.rulesOpenStartScreen[lang]}
                </Button>

                <Button
                    onClick={handleStartQuiz}
                    disabled={!selectedOptions.length}
                >
                    {langPack.buttons.start[lang]}
                </Button>
            </ButtonsBlock>

            {isRulesOpened && (
                <Modal
                    onClose={() => setIsRulesOpened(false)}
                    closeButtonTitle={
                        langPack.buttons.modalSpecial.rulesClose[lang]
                    }
                >
                    <RulesModalHeader>
                        {langPack.presentSimple.title[lang].toUpperCase()}
                    </RulesModalHeader>

                    {rulesDataTypes.map((type) => (
                        <Rules
                            title={`${capitalize(
                                langPack.presentSimple.title[lang]
                            )}: ${
                                langPack.presentSimple.taskSettings.types
                                    .labels[type][lang]
                            }`}
                            content={
                                rulesData.presentSimpleTableData[type].content
                            }
                            mark={rulesData.presentSimpleTableData[type].mark}
                            noTitle
                        />
                    ))}

                    {rulesDataTypes.includes("positives") && (
                        <Rules
                            title={
                                `"She loves":` +
                                langPack.presentSimple
                                    .positiveVerbsMutationTitle[lang]
                            }
                            content={
                                rulesData.presentSimplePositiveVerbsMutation
                            }
                        />
                    )}
                </Modal>
            )}
        </StyledStartScreen>
    );
}

export default StartScreen;
