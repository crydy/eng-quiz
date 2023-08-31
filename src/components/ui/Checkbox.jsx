import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: ${rem(15)};

    line-height: 1;
`;

const StyledCheckbox = styled.input`
    position: relative;
    appearance: none;

    border: 2px solid var(--color-text-main);
    border-radius: 50%;
    ${(props) => `
        width: ${rem(props.$checkboxSize)};
        height: ${rem(props.$checkboxSize)};
    `}

    outline: none;
    cursor: pointer;

    &:checked::before {
        position: absolute;
        content: "";

        ${(props) => `
            width: ${rem(props.$checkboxCoreSize)};
            height: ${rem(props.$checkboxCoreSize)};
            top: calc(50% - ${rem(props.$checkboxCoreSize / 2)});
            left: calc(50% - ${rem(props.$checkboxCoreSize / 2)});
        `}

        border-radius: 50%;
        background-color: var(--color-text-main);
    }
`;

function Checkbox({ children, ...props }) {
    const checkboxSize = 30;
    const checkboxCoreSize = checkboxSize * 0.4;

    return (
        <Label>
            <StyledCheckbox
                type="checkbox"
                $checkboxSize={checkboxSize}
                $checkboxCoreSize={checkboxCoreSize}
                {...props}
            />
            {children}
        </Label>
    );
}
export default Checkbox;
