import { useDraggable } from "@dnd-kit/core";
import { styled } from "styled-components";
import { buttonReset } from "../../../styles/styles";

const StyledDraggable = styled.button`
    ${buttonReset};
    touch-action: none;
    display: block;
`;

function Draggable({ id = "test", children }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: {
            type: "type1",
        },
    });

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <StyledDraggable
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            {children}
        </StyledDraggable>
    );
}

export default Draggable;
