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
// Components
import Button from "./ui/Button";
import RangeBlock from "./ui/RangeBlock";
import ToggleSet from "./ui/ToggleSet";
import CheckboxesSet from "./ui/CheckboxesSet";
import Modal from "./Modal";
import Rules from "./Rules";
import TaskScreen from "./layout/TaskScreen";
import { doubleLine } from "../styles/stylesPatterns";

const StyledStartScreen = styled.div`
    & > * {
        outline: 1px solid green;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(1rem, 3.8vh, 2.7rem);

    text-align: center;
`;

const Heading1 = styled.h1``;

const Heading2 = styled.h2``;

const Heading3 = styled.h3`
    ${doubleLine}
    padding: ${rem(6)} ${rem(0)};
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
        <TaskScreen>
            {/* <TaskScreen.TopBar>top</TaskScreen.TopBar> */}

            <TaskScreen.Titles>
                <Heading1>{langPack.appTitle[lang]}</Heading1>
                <Heading2>
                    - <span>{langPack.presentSimple.title[lang]}</span> -
                </Heading2>
                <Heading3>{langPack.presentSimple.subtitle[lang]}</Heading3>
            </TaskScreen.Titles>

            <TaskScreen.Content>
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
                ></RangeBlock>

                <CheckboxesSet
                    title={
                        langPack.presentSimple.taskSettings.types.title[lang]
                    }
                    options={Object.keys(options)}
                    labels={optionsLabels}
                    selectedOptions={selectedOptions}
                    onChange={handleCheckboxChange}
                    sizeFont={20}
                    sizeItemsGap={6}
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
                    sizeFont={16}
                    sizeFontTitle={24}
                    sizeTitleIndent={8}
                    sizeDevider={1.5}
                    colorFill="var(--color-button-bg)"
                    colorActiveFill="var(--color-text-main)"
                    colorActiveText="var(--color-bg)"
                    colorDevider="var(--color-bg)"
                />
            </TaskScreen.Content>

            <TaskScreen.Buttons>
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
            </TaskScreen.Buttons>

            <TaskScreen.Modal>
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
                                    rulesData.presentSimpleTableData[type]
                                        .content
                                }
                                mark={
                                    rulesData.presentSimpleTableData[type].mark
                                }
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
            </TaskScreen.Modal>
        </TaskScreen>
    );
}

export default StartScreen;
