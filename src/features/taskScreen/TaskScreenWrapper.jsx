import { styled } from "styled-components";

const StyledTaskScreenWrapper = styled.div`
    height: var(--size-body-height);

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 1em;

    padding-top: 1em;
    padding-bottom: 1em;

    text-align: center;
`;

function TaskScreenWrapper({ children }) {
    return <StyledTaskScreenWrapper>{children}</StyledTaskScreenWrapper>;
}

export default TaskScreenWrapper;
