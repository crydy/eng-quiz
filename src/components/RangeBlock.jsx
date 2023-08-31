import { styled } from "styled-components";
import Range from "./ui/Range";
import { rem } from "../utils/helpers";

const StyledRangeBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(20)};
`;

const Amount = styled.span`
    font-family: "Share Tech Mono", monospace;
`;

function RangeBlock({ label, value, ...props }) {
    return (
        <StyledRangeBlock>
            <label>
                {label} <Amount>{value > 9 ? value : "0" + value}</Amount>
            </label>
            <Range value={value} {...props} />
        </StyledRangeBlock>
    );
}

export default RangeBlock;
