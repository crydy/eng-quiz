// Libs
import { useContext } from "react";
// Context and hooks
import { useLang } from "../../../contexts/LangContext";
import { PronounAndVerbContext } from "./PronounAndVerb";
// Data and utils
import { langPack } from "../../../data/langPack";
import { verbs } from "../../../data/words/verbs";
// Components
import TaskScreenWrapper from "../../../features/taskScreen/TaskScreenWrapper";
import TaskScreenHeadings from "../../../features/taskScreen/TaskScreenHeadings";
import TaskScreenSettings from "../../../features/taskScreen/TaskScreenSettings";
import TaskScreenButtons from "../../../features/taskScreen/TaskScreenButtons";
import TaskScreenRange from "../../../features/taskScreen/TaskScreenRange";
import TaskScreenCheckboxes from "../../../features/taskScreen/TaskScreenCheckboxes";
import TaskScreenToggleSet from "../../../features/taskScreen/TaskScreenToggleSet";
import TaskScreenRulesModal from "./TaskScreenRulesModal";
import Button from "../../../components/ui/Button";

function TaskScreen() {
    const { lang } = useLang();

    const {
        amount,
        setAmount,
        options,
        selectedOptions,
        optionsLabels,
        verbsVariety,
        isRulesOpened,
        handleCheckboxChange,
        handleToggleChange,
        handleOpenRules,
        handleStartQuiz,
    } = useContext(PronounAndVerbContext);

    return (
        <TaskScreenWrapper>
            <TaskScreenHeadings>
                <h2>{langPack.presentSimple.title[lang].toUpperCase()}</h2>
                <h3>{langPack.presentSimple.subtitle[lang]}</h3>
            </TaskScreenHeadings>

            <TaskScreenSettings>
                <TaskScreenRange
                    title={
                        langPack.presentSimple.taskSettings
                            .questionsAmountRangeTitle[lang]
                    }
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                ></TaskScreenRange>

                <TaskScreenCheckboxes
                    title={
                        langPack.presentSimple.taskSettings.types.title[lang]
                    }
                    options={Object.keys(options)}
                    labels={optionsLabels}
                    selectedOptions={selectedOptions}
                    onChange={handleCheckboxChange}
                />

                <TaskScreenToggleSet
                    title={
                        langPack.presentSimple.taskSettings.verbsVarietyTitle[
                            lang
                        ]
                    }
                    options={verbs.getVariants()}
                    selectedOption={verbsVariety}
                    onChange={handleToggleChange}
                />
            </TaskScreenSettings>

            <TaskScreenButtons>
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
            </TaskScreenButtons>

            <TaskScreenRulesModal />
        </TaskScreenWrapper>
    );
}

export default TaskScreen;
