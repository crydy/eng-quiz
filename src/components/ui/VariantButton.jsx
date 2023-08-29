import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const StyledButton = styled.button`
    display: block;
    min-width: ${rem(350)};
    padding: ${rem(10)} ${rem(20)};

    border-radius: 100px;
    border: none;

    color: var(--color-variant-button-text);
    background-color: ${(props) => {
        switch (props.$version) {
            case "correct":
                return "var(--color-variant-button-bg-correct)";
            case "wrong":
                return "var(--color-variant-button-bg-wrong)";
            default:
                return "var(--color-variant-button-bg)";
        }
    }};

    &:not(:disabled):hover {
        background-color: var(--color-variant-button-bg-hover);
    }
`;

function VariantButton({ version, children, ...props }) {
    return (
        <StyledButton {...props} $version={version}>
            {children}
        </StyledButton>
    );
}

export default VariantButton;
