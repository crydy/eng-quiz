import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const StyledButton = styled.button`
    display: block;
    min-width: ${rem(245)};
    padding: 0.4em 1.2em;

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

function QuizVariantButton({
    isAnswered,
    isCorrectVersion,
    isWrongVersion,
    children,
    ...props
}) {
    return (
        <StyledButton
            {...props}
            type="button"
            disabled={isAnswered}
            $version={
                !isAnswered
                    ? "neutral"
                    : isCorrectVersion
                    ? "correct"
                    : isWrongVersion && "wrong"
            }
        >
            {children}
        </StyledButton>
    );
}

export default QuizVariantButton;
