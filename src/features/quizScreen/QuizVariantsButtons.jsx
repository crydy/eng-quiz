import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const VariantsButtons = styled.div`
    margin-top: ${rem(22)};
    margin-bottom: ${rem(22)};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${rem(14)};
`;

function QuizVariantsButtons({ children }) {
    return <VariantsButtons>{children}</VariantsButtons>;
}

export default QuizVariantsButtons;
