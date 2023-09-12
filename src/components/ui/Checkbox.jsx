import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: ${rem(15)};
    gap: ${(props) => rem(props.$sizeLabelIndent)};

    /* font-size: ${(props) => rem(props.$sizeFont)}; */
    font-size: min(6vw, 30px);

    line-height: 1;
    color: ${(props) => props.$color};

    cursor: pointer;
`;

const StyledCheckbox = styled.input`
    position: relative;
    appearance: none;
    border: 2px solid ${(props) => props.$color};
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
        background-color: ${(props) => props.$color};
    }
`;

function Checkbox({
    sizeFont = 16,
    color = "red",
    sizeLableIndent = 8,
    children,
    ...props
}) {
    const checkboxSize = sizeFont;
    const checkboxCoreSize = checkboxSize * 0.4;

    return (
        <Label
            $color={color}
            $sizeFont={sizeFont}
            $sizeLabelIndent={sizeLableIndent}
        >
            <StyledCheckbox
                type="checkbox"
                $checkboxSize={checkboxSize}
                $checkboxCoreSize={checkboxCoreSize}
                $color={color}
                {...props}
            />
            {children}
        </Label>
    );
}
export default Checkbox;
