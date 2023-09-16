import { styled } from "styled-components";
import { container } from "../../styles/stylesPatterns";

import ColorThemeSwitcher from "../ColorThemeSwitcher";
import LanguageButton from "../LanguageButton";

const StyledTopBar = styled.div`
    ${container};

    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-left: 0.5em;
    padding-right: 0.5em;

    width: 100vw;
    height: var(--size-top-bar-height);
`;

function TopBar() {
    const buttonsSize = ".6em";

    return (
        <StyledTopBar>
            <ColorThemeSwitcher size={buttonsSize} />
            <LanguageButton size={buttonsSize} />
        </StyledTopBar>
    );
}

export default TopBar;
