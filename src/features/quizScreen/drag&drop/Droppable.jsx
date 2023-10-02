import { useDroppable } from "@dnd-kit/core";
import { styled } from "styled-components";

const StyledDroppable = styled.div`
    /* outline: 1px solid red; */
`;

function Droppable({ id = "test", children }) {
    const { isOver, setNodeRef } = useDroppable({
        id,
        data: {
            accepts: ["type1"],
        },
    });

    const style = {
        backgrondColor: isOver ? "green" : undefined,
    };

    return (
        <StyledDroppable ref={setNodeRef} style={style}>
            {children}
        </StyledDroppable>
    );
}

export default Droppable;
