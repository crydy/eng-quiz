import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const StyledPartOfSpeach = styled.span`
    position: relative;

    &::before {
        content: "${(props) => props.$nature}";

        position: absolute;
        top: ${rem(-10)};
        left: 50%;
        width: max-content;
        transform: translateX(-50%);

        color: var(--color-text-part-of-speach);
        font-size: 0.4em;
        font-weight: 200;
    }
`;

function QuizPartOfSpeach({ nature, children }) {
    return <StyledPartOfSpeach $nature={nature}>{children}</StyledPartOfSpeach>;
}

export default QuizPartOfSpeach;
