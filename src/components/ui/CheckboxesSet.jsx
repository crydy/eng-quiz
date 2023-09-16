import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

import Checkbox from "./Checkbox";

const StyledCheckboxesSet = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${(props) =>
        typeof props.$sizeTitleIndent === "string"
            ? props.$sizeTitleIndent
            : rem(props.$sizeTitleIndent)};

    font-size: ${(props) =>
        typeof props.$sizeFont === "string"
            ? props.$sizeFont
            : rem(props.$sizeFont)};
`;

const Title = styled.h4`
    font-size: ${(props) =>
        typeof props.$sizeFontTitle === "string"
            ? props.$sizeFontTitle
            : rem(props.$sizeFontTitle)};
`;

const CheckboxesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${(props) =>
        typeof props.$sizeItemsGap === "string"
            ? props.$sizeItemsGap
            : rem(props.$sizeItemsGap)};
`;

function CheckboxesSet({
    title = "test title",
    hideTitle = false,
    // inner values
    options = ["test 1", "test 2", "test 3"],
    // visible values
    labels = options,
    selectedOptions = ["test 1", "test 3"],

    onChange,

    // string: valid css-value (as '1em')
    // number: (px size implied, will converted px=>rem)
    sizeFont = "1.2em",
    sizeFontTitle = "1.3em",
    sizeItemsGap = ".7em",
    sizeTitleIndent = ".7em",
    sizeLablesIndent = ".7em",

    color = "red",
}) {
    return (
        <StyledCheckboxesSet
            $sizeFont={sizeFont}
            $sizeTitleIndent={sizeTitleIndent}
        >
            {!hideTitle && (
                <Title $sizeFontTitle={sizeFontTitle}>{title}</Title>
            )}

            <CheckboxesList $sizeItemsGap={sizeItemsGap}>
                {options.map((option, index) => {
                    option = String(option);

                    return (
                        <li key={option}>
                            <Checkbox
                                name={option}
                                sizeFont={sizeFont}
                                color={color}
                                sizeLabelIndent={sizeLablesIndent}
                                defaultChecked={selectedOptions.includes(
                                    option
                                )}
                                onChange={onChange}
                            >
                                {labels.at(index)}
                            </Checkbox>
                        </li>
                    );
                })}
            </CheckboxesList>
        </StyledCheckboxesSet>
    );
}

export default CheckboxesSet;
