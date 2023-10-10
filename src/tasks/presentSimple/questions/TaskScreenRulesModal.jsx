import { styled } from "styled-components";

import { useLang } from "../../../contexts/LangContext";

import { langPack } from "../../../data/langPack";
import { rem } from "../../../utils/helpers";

import Modal from "../../../components/layout/modal/Modal";
import Table from "../../../components/ui/Table";

const RulesModalHeader = styled.h3`
    font-size: ${rem(31)};
    margin-top: ${rem(15)};
    margin-bottom: ${rem(15)};
`;

function RulesModal({ isRulesOpened, setIsRulesOpened, selectedOptions }) {
    const { lang } = useLang();

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
                        {{ en: "Questions", ru: "Вопросы" }[lang]}
                    </RulesModalHeader>

                    {selectedOptions.map((type) => (
                        <Table
                            subtitle={
                                {
                                    past: {
                                        en: "simple past",
                                        ru: "простое прошедшее",
                                    },
                                    present: {
                                        en: "simple present",
                                        ru: "простое настоящее",
                                    },
                                    future: {
                                        en: "simple future",
                                        ru: "простое будущее",
                                    },
                                }[type][lang]
                            }
                            content={
                                {
                                    past: {
                                        content: [
                                            [
                                                ["did"],
                                                [
                                                    "I",
                                                    "you",
                                                    "we",
                                                    "they",
                                                    "he",
                                                    "she",
                                                    "it",
                                                ],
                                                ["love ... ?"],
                                            ],
                                        ],
                                    },
                                    present: {
                                        content: [
                                            [
                                                ["do"],
                                                ["I", "you", "we", "they"],
                                                ["love ... ?"],
                                            ],
                                            [
                                                ["does"],
                                                ["he", "she", "it"],
                                                ["love ... ?"],
                                            ],
                                        ],
                                    },
                                    future: {
                                        content: [
                                            [
                                                ["will"],
                                                [
                                                    "I",
                                                    "you",
                                                    "we",
                                                    "they",
                                                    "he",
                                                    "she",
                                                    "it",
                                                ],
                                                ["love ... ?"],
                                            ],
                                        ],
                                    },
                                }[type].content
                            }
                            noTitle
                        />
                    ))}
                </Modal>
            )}
        </>
    );
}

export default RulesModal;
