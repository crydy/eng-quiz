import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { css, styled } from "styled-components";
import { DndContext } from "@dnd-kit/core";

import { assembleSentence, getShuffledArrayCopy } from "../../../utils/helpers";

import Droppable from "./Droppable";
import Draggable from "./Draggable";

const ulStyle = css`
    display: flex;

    flex-wrap: wrap;
    gap: 0.4em;

    & li,
    & span {
        display: block;
        border-radius: 100px;
    }
`;

const ListTitle = styled.h3`
    font-size: 0.6em;
    margin-bottom: 0.4em;

    opacity: ${(props) => (props.$hideTitle ? "0" : "1")};
    transition: opacity 0.5s ease;
`;

const StyledReceiverList = styled.ul`
    ${ulStyle};

    justify-content: center;

    min-height: ${(props) =>
        props.$initialHeight ? props.$initialHeight + "px" : ""};

    & li {
        outline: 1px dotted var(--color-quiz-phrase-constructor-cell-bg);
        background-color: var(--color-quiz-phrase-constructor-cell-bg-empty);
    }

    & span {
        background-color: var(--color-quiz-phrase-constructor-cell-bg);
        padding: 0.3em 0.8em;

        &.placeholder {
            background-color: transparent;
            color: transparent;
        }
    }
`;

const StyledTransmitterList = styled.ul`
    ${ulStyle};

    justify-content: center;

    min-height: ${(props) =>
        props.$initialHeight ? props.$initialHeight + "px" : ""};

    opacity: ${(props) => (props.$isFilled ? ".3" : "1")};
    pointer-events: ${(props) => (props.$isFilled ? "none" : "")};

    & span {
        color: var(--color-text-main);
        background-color: var(--color-quiz-phrase-constructor-cell-bg);
        padding: 0.3em 0.8em;
    }
`;

const PhrasalQuestionContext = createContext();

function PhrasalQuestion({
    phraseWords = ["have", "you", "seen", "her", "?"],
    wrongWords = [],

    onAssemble,
    onDisassemble,

    children,
}) {
    // stringify for correct dependency
    const plainPhraseArray = JSON.stringify(phraseWords);
    const plainNoiseWords = JSON.stringify(wrongWords);

    // keep the same shuffled word order as during the first rendering
    // (this is necessary when extracting words back - to force them to be nested the same place)
    const words = useMemo(
        () =>
            getShuffledArrayCopy([
                ...JSON.parse(plainPhraseArray),
                ...JSON.parse(plainNoiseWords),
            ]),
        [plainPhraseArray, plainNoiseWords]
    );

    const [droppedElems, setdroppedElems] = useState([]);
    const isFilled = droppedElems.length === phraseWords.length;

    if (isFilled) {
        const userSequenceArray = droppedElems
            .sort((a, b) => a.cell.localeCompare(b.cell))
            .map((item) => item.elem);

        console.log(assembleSentence(userSequenceArray));

        onAssemble(userSequenceArray);
    } else onDisassemble();

    function handleDragStart(event) {}
    function handleDragOver(event) {}

    function handleDragEnd(event) {
        const { active, over } = event;

        // exctract the word back
        if (!over) {
            setdroppedElems((droppedElems) => [
                ...droppedElems.filter((obj) => obj.elem !== active.id),
            ]);

            return;
        }

        const isDroppable = over.data.current.accepts.includes(
            active.data.current.type
        );
        const isOccupied = droppedElems.find((obj) => obj.cell === over.id);
        const isElemHere = droppedElems.find((obj) => obj.elem === active.id);

        // placing inside free cell
        if (over && isDroppable && !isOccupied) {
            setdroppedElems((droppedElems) => [
                ...droppedElems.filter((obj) => obj.elem !== active.id),
                {
                    elem: active.id,
                    cell: over.id,
                },
            ]);

            return;
        }

        // interchanging two cells
        if (isOccupied && isElemHere) {
            const activeNewCell = over.id;
            const activePrevCell = droppedElems.find(
                (obj) => obj.elem === active.id
            ).cell;

            setdroppedElems((droppedElems) => [
                ...droppedElems.map((obj) => {
                    if (obj.cell === activeNewCell)
                        return { elem: obj.elem, cell: activePrevCell };
                    if (obj.cell === activePrevCell)
                        return { elem: obj.elem, cell: activeNewCell };
                    return obj;
                }),
            ]);

            return;
        }
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <PhrasalQuestionContext.Provider
                value={{ phraseWords, words, droppedElems, isFilled }}
            >
                {children}
            </PhrasalQuestionContext.Provider>
        </DndContext>
    );
}

function ReceiverList({ title, hideTitle = false }) {
    const { phraseWords, droppedElems } = useContext(PhrasalQuestionContext);
    const isTitleHidden = droppedElems.length !== 0;

    // keep the element's height stable
    const initialHeightRef = useRef(0);
    useEffect(() => {
        const initialHeight =
            document.getElementById("receiver-list").offsetHeight;
        initialHeightRef.current = initialHeight;
    }, []);

    return (
        <div>
            {title && (
                <ListTitle $hideTitle={hideTitle && isTitleHidden}>
                    {title}
                </ListTitle>
            )}

            <StyledReceiverList
                id="receiver-list"
                $initialHeight={initialHeightRef.current}
            >
                {phraseWords.map((_, index) => (
                    <>
                        <li key={`li ${index}`}>
                            <Droppable id={`field ${index}`}>
                                {droppedElems.find(
                                    (obj) => obj.cell === `field ${index}`
                                ) ? (
                                    <Draggable
                                        id={
                                            droppedElems.find(
                                                (obj) =>
                                                    obj.cell ===
                                                    `field ${index}`
                                            ).elem
                                        }
                                    >
                                        <span>
                                            {
                                                droppedElems.find(
                                                    (obj) =>
                                                        obj.cell ===
                                                        `field ${index}`
                                                ).elem
                                            }
                                        </span>
                                    </Draggable>
                                ) : (
                                    <span className="placeholder">xxx</span>
                                )}
                            </Droppable>
                        </li>
                    </>
                ))}
            </StyledReceiverList>
        </div>
    );
}

function TransmitterList({ title, hideTitle = false }) {
    const { words, droppedElems, isFilled } = useContext(
        PhrasalQuestionContext
    );
    const isTitleHidden = droppedElems.length !== 0;

    // keep the element's height stable
    const initialHeightRef = useRef(0);
    useEffect(() => {
        const initialHeight =
            document.getElementById("transmitter-list").offsetHeight;
        initialHeightRef.current = initialHeight;
    }, []);

    return (
        <div>
            {title && (
                <ListTitle $hideTitle={hideTitle && isTitleHidden}>
                    {title}
                </ListTitle>
            )}

            <StyledTransmitterList
                id="transmitter-list"
                $initialHeight={initialHeightRef.current}
                $isFilled={isFilled}
            >
                {words.map((word) => (
                    <>
                        {!droppedElems.find((obj) => obj.elem === word) && (
                            <li key={word}>
                                <Draggable id={word}>
                                    <span>{word}</span>
                                </Draggable>
                            </li>
                        )}
                    </>
                ))}
            </StyledTransmitterList>
        </div>
    );
}

PhrasalQuestion.TransmitterList = TransmitterList;
PhrasalQuestion.ReceiverList = ReceiverList;

export default PhrasalQuestion;
