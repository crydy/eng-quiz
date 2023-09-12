import { createContext } from "react";
import { styled } from "styled-components";
import { rem } from "../../utils/helpers";
import { flexColumn, flexRow } from "../../styles/stylesPatterns";

const StyledTaskScreen = styled.div`
    ${flexColumn}

    gap: ${rem(10)};
    justify-content: space-around;
    min-height: 94vh; // minus TopBar height

    /* & > * {
        outline: 1px solid pink;
    } */
`;

const StyledTitles = styled.div`
    ${flexColumn}

    justify-content: space-between;
    min-height: 18vh;
    margin-top: 8vh;
    gap: ${rem(15)};
`;

const StyledContent = styled.div`
    ${flexColumn}

    justify-content: space-between;
    min-height: 35vh;
    gap: ${rem(15)};
`;

const StyledButtons = styled.div`
    ${flexRow}
    gap: ${rem(16)};

    margin-bottom: 10vh;
`;

const TaskScreenContext = createContext();

function TaskScreen({ children }) {
    return (
        <TaskScreenContext.Provider value={{}}>
            <StyledTaskScreen>{children}</StyledTaskScreen>
        </TaskScreenContext.Provider>
    );
}

function TopBar({ children }) {
    return <div>{children}</div>;
}
function Titles({ children }) {
    return <StyledTitles>{children}</StyledTitles>;
}
function Content({ children }) {
    return <StyledContent>{children}</StyledContent>;
}
function Buttons({ children }) {
    return <StyledButtons>{children}</StyledButtons>;
}
function Modal({ children }) {
    return <>{children}</>;
}

TaskScreen.TopBar = TopBar;
TaskScreen.Titles = Titles;
TaskScreen.Content = Content;
TaskScreen.Buttons = Buttons;
TaskScreen.Modal = Modal;

export default TaskScreen;
