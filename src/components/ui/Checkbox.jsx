import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: ${(props) =>
        typeof props.$sizeLabelIndent === "string"
            ? props.$sizeLabelIndent
            : rem(props.$sizeLabelIndent)};

    line-height: 1;
    font-size: ${(props) =>
        typeof props.$sizeFont === "string"
            ? props.$sizeFont
            : rem(props.$sizeFont)};

    color: ${(props) => props.$color};
    cursor: pointer;
`;

const StyledCheckbox = styled.input`
    appearance: none;

    /* stable outline for all states */
    &,
    &:active,
    &:focus {
        outline: ${(props) =>
                typeof props.$sizeCheckboxOutline === "string"
                    ? props.$sizeCheckboxOutline
                    : rem(props.$sizeCheckboxOutline)}
            solid ${(props) => props.$color};

        outline-offset: 0;
    }

    position: relative;
    cursor: pointer;
    border-radius: 50%;

    width: ${(props) =>
        typeof props.$sizeCheckbox === "string"
            ? props.$sizeCheckbox
            : rem(props.$sizeCheckbox)};

    height: ${(props) =>
        typeof props.$sizeCheckbox === "string"
            ? props.$sizeCheckbox
            : rem(props.$sizeCheckbox)};

    &:checked::before {
        position: absolute;
        content: "";

        width: ${(props) =>
            typeof props.$sizeCheckbox === "string"
                ? props.$sizeCheckbox
                : rem(props.$sizeCheckbox)};

        height: ${(props) =>
            typeof props.$sizeCheckbox === "string"
                ? props.$sizeCheckbox
                : rem(props.$sizeCheckbox)};

        transform: ${(props) =>
            `scale(${props.$sizeCheckboxCoreRatio * 100}%)`};

        border-radius: 50%;
        background-color: ${(props) => props.$color};
    }
`;

function Checkbox({
    // string: valid css-value (as '1em')
    // number: (px size implied, will converted px=>rem)
    sizeFont = "1em",
    sizeLabelIndent = ".5em",
    sizeCheckbox = sizeFont,
    sizeCheckboxOutline = 2.5,
    // number only: from 0 to 1
    sizeCheckboxCoreRatio = 0.5,

    color = "red",

    children,
    ...props
}) {
    return (
        <Label
            $color={color}
            $sizeFont={sizeFont}
            $sizeLabelIndent={sizeLabelIndent}
        >
            <StyledCheckbox
                type="checkbox"
                $sizeCheckbox={sizeCheckbox}
                $sizeCheckboxOutline={sizeCheckboxOutline}
                $sizeCheckboxCoreRatio={sizeCheckboxCoreRatio}
                $color={color}
                {...props}
            />
            {children}
        </Label>
    );
}
export default Checkbox;
