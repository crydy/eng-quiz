// Libs
import { Outlet } from "react-router-dom";
// Components
import TopBar from "./components/layout/TopBar";
import { styled } from "styled-components";

const StyledApp = styled.div`
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Body = styled.div`
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    /* outline: 1px solid red; */
`;

function App() {
    return (
        <StyledApp>
            <TopBar />
            <Body>
                <Outlet />
            </Body>
        </StyledApp>
    );
}

export default App;
