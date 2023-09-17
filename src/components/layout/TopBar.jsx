import { styled } from "styled-components";
import { container } from "../../styles/stylesPatterns";

import ColorThemeSwitcher from "../ColorThemeSwitcher";
import LanguageButton from "../LanguageButton";
import Button from "../ui/Button";
import { useLocation, useNavigate } from "react-router-dom";

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
    const currentLocation = useLocation();
    const isIndexPage = currentLocation.pathname === "/";

    const buttonsFontSize = ".6em";
    const navigate = useNavigate();

    function handleOnHomeButtonClick() {
        navigate("/");
    }

    return (
        <StyledTopBar>
            <ColorThemeSwitcher size={buttonsFontSize} />

            {!isIndexPage && (
                <Button
                    sizeFont={buttonsFontSize}
                    sizePadding="0.35em 0.8em"
                    onClick={handleOnHomeButtonClick}
                >
                    Back to index
                </Button>
            )}

            <LanguageButton size={buttonsFontSize} />
        </StyledTopBar>
    );
}

export default TopBar;
