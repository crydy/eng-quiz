import { styled } from "styled-components";
import { doubleLine } from "../../styles/styles";
import { rem } from "../../utils/helpers";

const StyledTaskScreenHeadings = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;

    & > *:last-child:not(:only-child) {
        width: fit-content;
        margin: 0 auto;
        ${doubleLine}
        padding: ${rem(6)} ${rem(0)};
    }
`;

function TaskScreenHeadings({ children }) {
    return <StyledTaskScreenHeadings>{children}</StyledTaskScreenHeadings>;
}

export default TaskScreenHeadings;
