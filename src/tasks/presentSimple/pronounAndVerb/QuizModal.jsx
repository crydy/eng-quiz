import { useLang } from "../../../contexts/LangContext";
import { useQuiz } from "../../../contexts/QuizContext";
import { capitalize } from "../../../utils/helpers";
import { langPack } from "../../../data/langPack";
import { rulesData } from "../../../data/rulesData";

import Modal from "../../../components/layout/modal/Modal";
import Table from "../../../components/ui/Table";

function QuizModal({ isModalOpen, onClose }) {
    const { lang } = useLang();
    const { current, questions } = useQuiz();

    const { type: questionType } = questions.at(current);

    return (
        <>
            {isModalOpen && (
                <Modal
                    onClose={() => onClose()}
                    closeButtonTitle={
                        langPack.buttons.modalSpecial.rulesClose[lang]
                    }
                >
                    <Table
                        title={capitalize(langPack.presentSimple.title[lang])}
                        subtitle={
                            langPack.presentSimple.taskSettings.types.labels[
                                questionType
                            ][lang]
                        }
                        content={
                            rulesData.presentSimpleTableData[questionType]
                                .content
                        }
                        mark={
                            rulesData.presentSimpleTableData[questionType].mark
                        }
                    />
                </Modal>
            )}
        </>
    );
}

export default QuizModal;
