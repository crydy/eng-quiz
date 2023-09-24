import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const StyledButton = styled.button`
    --outline-width: 1px;

    line-height: 1;
    font-size: ${(props) =>
        props.$sizeFont && typeof props.$sizeFont === "string"
            ? props.$sizeFont
            : rem(props.$sizeFont)};

    border: none;
    border-radius: 100px;
    padding: ${(props) => props.$sizePadding};

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

function Button({
    visible = true,
    colorless = false,

    sizeFont, // inherit by default
    sizePadding = "0.6em 1.2em", // string only

    children,
    ...props
}) {
    return (
        <StyledButton
            $visible={visible}
            $colorless={colorless}
            $sizeFont={sizeFont}
            $sizePadding={sizePadding}
            {...props}
        >
            {children}
        </StyledButton>
    );
}

export default Button;
