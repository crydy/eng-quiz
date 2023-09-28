import { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { DndContext } from "@dnd-kit/core";

import { getShuffledArrayCopy } from "../../utils/helpers";

import Droppable from "./dnd/Droppable";
import Draggable from "./dnd/Draggable";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    & ul {
        display: flex;
        gap: 0.4em;
    }

    & li,
    & span {
        display: block;
        border-radius: 100px;
    }
`;

const ReceiverList = styled.ul`
    & li {
        background-color: red;
    }

    & span {
        background-color: pink;
        padding: 0.3em 0.8em;

        &.placeholder {
            background-color: transparent;
            color: transparent;
        }
    }
`;

const TransmitterList = styled.ul`
    & span {
        color: red;
        background-color: pink;
        padding: 0.3em 0.8em;
    }
`;

function Test({
    phraseWords = ["have", "you", "seen", "her", "?"],
    wrongWords = ["did", "were", "see", "was"],
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

    // TEMP: read the result
    useEffect(() => {
        console.log(droppedElems.sort((a, b) => a.cell > b.cell));
    }, [droppedElems]);

    function handleDragStart(e) {}
    function handleDragOver(e) {}

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
            <Container>
                <ReceiverList>
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
                </ReceiverList>

                <TransmitterList>
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
                </TransmitterList>
            </Container>
        </DndContext>
    );
}

export default Test;
