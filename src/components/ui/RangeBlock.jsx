import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

import Range from "./Range";

const StyledRangeBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${(props) =>
        typeof props.$sizeGap === "string"
            ? props.$sizeGap
            : rem(props.$sizeGap)};

    width: min-content;

    font-size: ${(props) =>
        typeof props.$sizeFont === "string"
            ? props.$sizeFont
            : rem(props.$sizeFont)};

    & label {
        white-space: nowrap;
        font-weight: 500;
    }
`;

const Amount = styled.span`
    font-family: var(--font-numbers);
`;

function RangeBlock({
    title,
    value,

    // string: valid css-value (as '1em')
    // number: (px size implied, will converted px=>rem)
    sizeFont = "1.2em",
    sizeGap = ".5em",

    ...props
}) {
    return (
        <StyledRangeBlock $sizeFont={sizeFont} $sizeGap={sizeGap}>
            <label htmlFor={title}>
                {title} <Amount>{value > 9 ? value : "0" + value}</Amount>
            </label>
            <Range value={value} id={title} {...props} />
        </StyledRangeBlock>
    );
}

export default RangeBlock;
