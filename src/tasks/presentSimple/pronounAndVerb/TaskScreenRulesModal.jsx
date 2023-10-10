import { useContext } from "react";
import { styled } from "styled-components";

import { useLang } from "../../../contexts/LangContext";
import { PronounAndVerbContext } from "./PronounAndVerb";

import { langPack } from "../../../data/langPack";
import { rulesData } from "../../../data/rulesData";
import { capitalize, rem } from "../../../utils/helpers";

import Modal from "../../../components/layout/modal/Modal";
import Table from "../../../components/ui/Table";

const RulesModalHeader = styled.h3`
    font-size: ${rem(31)};
    margin-top: ${rem(15)};
    margin-bottom: ${rem(15)};
`;

function RulesModal() {
    const { lang } = useLang();

    const { isRulesOpened, setIsRulesOpened, selectedOptions } = useContext(
        PronounAndVerbContext
    );

    return (
        <>
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

                    {selectedOptions.map((type) => (
                        <Table
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

                    {selectedOptions.includes("positives") && (
                        <Table
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
        </>
    );
}

export default RulesModal;
