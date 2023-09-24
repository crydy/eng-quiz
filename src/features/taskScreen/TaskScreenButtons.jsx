import { styled } from "styled-components";
import { flexRow } from "../../styles/styles";
import { rem } from "../../utils/helpers";

const StyledTaskScreenButtons = styled.div`
    ${flexRow}
    gap: ${rem(16)};
`;

function TaskScreenButtons({ children }) {
    return <StyledTaskScreenButtons>{children}</StyledTaskScreenButtons>;
}

export default TaskScreenButtons;
