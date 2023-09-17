// Libs
import { useState } from "react";
import { styled } from "styled-components";
// Context and hooks
import { useQuiz } from "../contexts/QuizContext";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useForbidBodyScroll } from "../hooks/useForbidBodyScroll";
// Data and utils
import { LOCAL_STORAGE_KEY as KEY } from "../config/localStorageConfig";
import { verbs } from "../data/words/verbs";
import { langPack } from "../data/langPack";
import { rulesData } from "../data/rulesData";
import { capitalize, rem } from "../utils/helpers";
// Styles
import { doubleLine, flexRow } from "../styles/stylesPatterns";
// Components
import Button from "./ui/Button";
import RangeBlock from "./ui/RangeBlock";
import ToggleSet from "./ui/ToggleSet";
import CheckboxesSet from "./ui/CheckboxesSet";
import Modal from "./Modal";
import Rules from "./Rules";

const StyledStartScreen = styled.div`
    /* & > * {
        outline: 1px solid green;
    } */

    height: var(--size-body-height);

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 1em;

    padding-top: 1em;
    padding-bottom: 1em;

    text-align: center;
`;

const Headings = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const Settings = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
`;

const HeadingDoubleLined = styled.h3`
    width: fit-content;
    margin: 0 auto;
    ${doubleLine}
    padding: ${rem(6)} ${rem(0)};
`;

const Buttons = styled.div`
    ${flexRow}
    gap: ${rem(16)};
`;

const RulesModalHeader = styled.h3`
    font-size: ${rem(31)};
    margin-top: ${rem(15)};
    margin-bottom: ${rem(15)};
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
    useForbidBodyScroll(isRulesOpened);

    const selectedOptions = Object.keys(options).filter(
        (item) => options[item] === true
    );

    const optionsLabels = Object.values(
        langPack.presentSimple.taskSettings.types.labels
    ).map((item) => item[lang]);

    const rulesDataTypes = selectedOptions;

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
            <Headings>
                {/* <h1>{langPack.appTitle[lang]}</h1> */}

                <h2>{langPack.presentSimple.title[lang].toUpperCase()}</h2>

                <HeadingDoubleLined>
                    {langPack.presentSimple.subtitle[lang]}
                </HeadingDoubleLined>
            </Headings>

            <Settings>
                <RangeBlock
                    title={
                        langPack.presentSimple.taskSettings
                            .questionsAmountRangeTitle[lang]
                    }
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="10"
                    max="30"
                    trackColor="var(--color-range-track)"
                    thumbColor="var(--color-range-thumb)"
                    sizeFont="1.2em"
                    sizeGap=".5em"
                ></RangeBlock>

                <CheckboxesSet
                    title={
                        langPack.presentSimple.taskSettings.types.title[lang]
                    }
                    options={Object.keys(options)}
                    labels={optionsLabels}
                    selectedOptions={selectedOptions}
                    onChange={handleCheckboxChange}
                    sizeFont="1em"
                    sizeItemsGap=".7em"
                    color="var(--color-text-main)"
                />

                <ToggleSet
                    title={
                        langPack.presentSimple.taskSettings.verbsVarietyTitle[
                            lang
                        ]
                    }
                    options={verbs.getVariants()}
                    selectedOption={verbsVariety}
                    onChange={handleToggleChange}
                    sizeFont="1em"
                    sizeFontTitle="1.3em"
                    sizeTitleIndent={10}
                    sizeDevider={1.5}
                    colorFill="var(--color-button-bg)"
                    colorActiveFill="var(--color-text-main)"
                    colorActiveText="var(--color-bg)"
                    colorDevider="var(--color-bg)"
                />
            </Settings>

            <Buttons>
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
            </Buttons>

            {isRulesOpened && (
                <Modal
                    onClose={() => setIsRulesOpened(false)}
                    closeButtonTitle={
                        langPack.buttons.modalSpecial.rulesClose[lang]
                    }
                >
                    <RulesModalHeader>
                        {capitalize(langPack.presentSimple.title[lang])}
                    </RulesModalHeader>

                    {rulesDataTypes.map((type) => (
                        <Rules
                            subtitle={
                                langPack.presentSimple.taskSettings.types
                                    .labels[type][lang]
                            }
                            content={
                                rulesData.presentSimpleTableData[type].content
                            }
                            mark={rulesData.presentSimpleTableData[type].mark}
                            noTitle
                        />
                    ))}

                    {rulesDataTypes.includes("positives") && (
                        <Rules
                            noTitle
                            subtitle={
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
