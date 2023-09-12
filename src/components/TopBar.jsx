import { styled } from "styled-components";
import ColorThemeSwitcher from "./ColorThemeSwitcher";
import LanguageButton from "./LanguageButton";

const StyledTopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100vw;
    height: 6vh;

    & > * {
        transform: scale(70%);
    }
`;

function TopBar() {
    return (
        <StyledTopBar>
            <ColorThemeSwitcher />
            <LanguageButton />
        </StyledTopBar>
    );
}

export default TopBar;
