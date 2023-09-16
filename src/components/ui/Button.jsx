import { styled } from "styled-components";

const StyledButton = styled.button`
    --outline-width: 1px;

    border: none;
    border-radius: 100px;
    padding: 0.4em 1.2em;

    color: var(--color-button-text);
    opacity: ${(props) => (props.$visible ? 1 : 0)};

    background-color: ${(props) =>
        props.$colorless ? "transparent" : "var(--color-button-bg)"};

    outline-offset: calc(var(--outline-width) * -1);
    outline: ${(props) =>
        props.$colorless
            ? "var(--outline-width) solid var(--color-text-main)"
            : "none"};

    pointer-events: ${(props) => (props.$visible ? "" : "none")};

    &:not(:disabled):hover {
        color: ${(props) => (props.$colorless ? "var(--color-button-bg)" : "")};

        background-color: ${(props) =>
            props.$colorless
                ? "var(--color-button-text)"
                : "var(--color-button-bg-hover)"};

        outline: ${(props) =>
            props.$colorless ? "1px solid var(--color-text-main)" : "none"};
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
