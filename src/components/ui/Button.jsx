import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const StyledButton = styled.button`
    color: var(--color-button-text);
    background-color: ${(props) =>
        props.$colorless ? "transparent" : "var(--color-button-bg)"};
    border: ${(props) =>
        props.$colorless ? "1px solid var(--color-text-main)" : "none"};
    border-radius: 100px;
    padding: ${rem(10)} ${rem(30)};

    opacity: ${(props) => (props.$visible ? 1 : 0)};
    pointer-events: ${(props) => (props.$visible ? "" : "none")};

    &:hover {
        background-color: ${(props) =>
            props.$colorless ? "none" : "var(--color-button-bg-hover)"};
    }
`;

function Button({ visible = true, colorless = false, children, ...props }) {
    return (
        <StyledButton $visible={visible} $colorless={colorless} {...props}>
            {children}
        </StyledButton>
    );
}

export default Button;
