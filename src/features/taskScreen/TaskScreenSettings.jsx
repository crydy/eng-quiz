import { styled } from "styled-components";

const StyledTaskScreenSettings = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
`;

function TaskScreenSettings({ children }) {
    return <StyledTaskScreenSettings>{children}</StyledTaskScreenSettings>;
}

export default TaskScreenSettings;
