import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const StyledButton = styled.button`
    color: var(--color-button-text);
    background-color: var(--color-button-bg);
    border: none;
    border-radius: 100px;
    padding: ${rem(10)} ${rem(30)};

    opacity: ${(props) => (props.$visible ? 1 : 0)};
    pointer-events: ${(props) => (props.$visible ? "" : "none")};

    &:hover {
        background-color: var(--color-button-bg-hover);
    }
`;

function Button({ visible = true, children, ...props }) {
    return (
        <StyledButton $visible={visible} {...props}>
            {children}
        </StyledButton>
    );
}

export default Button;
