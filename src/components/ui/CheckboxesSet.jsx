import { styled } from "styled-components";
import { rem } from "../../utils/helpers";
import Checkbox from "./Checkbox";

const StyledCheckboxesSet = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${(props) => rem(props.$sizeTitleIndent)};

    font-size: min(6vw, 30px);

    & > h3 {
        font-size: ${(props) => rem(props.$sizeFontTitle)};
        color: ${(props) => props.$color};
    }
`;

const Title = styled.h4`
    font-size: min(8vw, 40px);
`;

const CheckboxesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${(props) => rem(props.$sizeItemsGap)};
`;

function CheckboxesSet({
    title = "test title",
    options = ["test 1", "test 2", "test 3"],
    labels = options,
    selectedOptions = ["test 1"],
    sizeFont = 16,
    sizeFontTitle = sizeFont * 1.2,
    sizeItemsGap = 8,
    sizeTitleIndent = sizeItemsGap,
    sizeLablesIndent = 8,
    color = "red",
    hideTitle = false,
    onChange,
}) {
    return (
        <StyledCheckboxesSet
            $sizeFont={sizeFont}
            $sizeFontTitle={sizeFontTitle}
            $sizeTitleIndent={sizeTitleIndent}
            $color={color}
        >
            {!hideTitle && <Title>{title}</Title>}
            <CheckboxesList $sizeItemsGap={sizeItemsGap}>
                {options.map((option, index) => {
                    option = String(option);

                    return (
                        <li key={option}>
                            <Checkbox
                                name={option}
                                sizeFont={sizeFont}
                                color={color}
                                sizeLableIndent={sizeLablesIndent}
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
