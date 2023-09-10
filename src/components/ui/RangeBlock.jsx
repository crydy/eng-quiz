import { styled } from "styled-components";
import { rem } from "../../utils/helpers";
import Range from "./Range";

const StyledRangeBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(6)};

    width: min-content;

    & label {
        white-space: nowrap;
    }
`;

const Amount = styled.span`
    font-family: var(--font-numbers);
`;

function RangeBlock({ title, value, ...props }) {
    return (
        <StyledRangeBlock>
            <label htmlFor={title}>
                {title} <Amount>{value > 9 ? value : "0" + value}</Amount>
            </label>
            <Range value={value} id={title} {...props} />
        </StyledRangeBlock>
    );
}

export default RangeBlock;
