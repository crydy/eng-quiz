import { createPortal } from "react-dom";
import { styled } from "styled-components";
import { CgCloseR } from "react-icons/cg";

import { rem } from "../utils/helpers";
import { useQuiz } from "../contexts/QuizContext";
import { langPack } from "../data/langPack";

const StyledModal = styled.div`
    z-index: var(--z-index-modal);
    position: fixed;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 80vw;
    min-width: max-content;
    max-width: var(--size-max-width);
    max-height: 80vh;

    padding: ${(props) =>
        rem(props.$padding[0]) + " " + rem(props.$padding[1]) + ";"};
    padding-bottom: 0;

    background-color: var(--color-bg);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: ${rem(5)};

    overflow: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const CloseButton = styled.button`
    z-index: var(--z-index-modal);
    position: ${(props) => (props.$inStream ? "static" : "absolute")};
    top: 0;
    right: 0;

    padding: ${(props) => (props.$inStream ? "" : ".6em")};

    line-height: ${(props) => (props.$inStream ? "inherit" : "0.1")};

    margin-top: ${(props) =>
        props.$inStream ? rem(props.$padding[0] / 2) : ""};
    margin-bottom: ${(props) =>
        props.$inStream ? rem(props.$padding[0]) : ""};

    background-color: transparent;
    border: none;
    color: var(--color-text-main);
    cursor: pointer;
`;

const Overlay = styled.div`
    z-index: var(--z-index-overlay);
    position: fixed;

    top: 0;
    left: 0;
    right: 0;
    bottom: -600px;

    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px) grayscale(70%);
`;

function Modal({ onClose, closeButtonTitle, padding = [20, 8], children }) {
    const { lang } = useQuiz();

    closeButtonTitle = closeButtonTitle
        ? closeButtonTitle
        : langPack.buttons.modal[lang];

    return (
        <>
            {createPortal(
                <>
                    <StyledModal $padding={padding}>
                        <CloseButton onClick={onClose} $padding={padding}>
                            <CgCloseR />
                        </CloseButton>

                        {children}

                        <CloseButton
                            onClick={onClose}
                            $padding={padding}
                            $inStream
                        >
                            - {closeButtonTitle} -
                        </CloseButton>
                    </StyledModal>
                    <Overlay onClick={onClose} />
                </>,
                document.body
            )}
        </>
    );
}

export default Modal;
