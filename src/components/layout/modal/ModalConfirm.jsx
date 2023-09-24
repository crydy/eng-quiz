import { styled } from "styled-components";

import { rem } from "../../../utils/helpers";
import { useQuiz } from "../../../contexts/QuizContext";
import { langPack } from "../../../data/langPack";

import Modal from "./Modal";
import Button from "../../ui/Button";

const Content = styled.div`
    text-align: center;
    margin: ${rem(10)} ${rem(30)};

    & > p {
        margin-bottom: ${rem(15)};
    }
`;

const ButtonsWrap = styled.div`
    display: flex;
    gap: ${rem(15)};
    justify-content: center;
`;

function ModalConfirm({ children: question, onConfirm, onClose, ...rest }) {
    const { lang } = useQuiz();

    return (
        <Modal noCloseButton onClose={onClose} {...rest}>
            <Content>
                <p>{question}</p>

                <ButtonsWrap>
                    <Button onClick={onConfirm}>
                        {langPack.buttons.modalConfirm.yes[lang]}
                    </Button>
                    <Button onClick={onClose}>
                        {langPack.buttons.modalConfirm.no[lang]}
                    </Button>
                </ButtonsWrap>
            </Content>
        </Modal>
    );
}

export default ModalConfirm;
