import { styled } from "styled-components";
import { rem } from "../../utils/helpers";
import Range from "./Range";

const StyledRangeBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(10)};

    width: min-content;
    /* font-size: ${(props) => rem(props.$sizeFont)}; */
    font-size: min(6vw, 30px);

    & label {
        white-space: nowrap;
    }
`;

const Amount = styled.span`
    font-family: var(--font-numbers);
`;

function RangeBlock({ title, value, sizeFont = 20, ...props }) {
    return (
        <StyledRangeBlock $sizeFont={sizeFont}>
            <label htmlFor={title}>
                {title} <Amount>{value > 9 ? value : "0" + value}</Amount>
            </label>
            <Range value={value} id={title} {...props} />
        </StyledRangeBlock>
    );
}

export default RangeBlock;
