import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const Container = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.$reverse ? "row-reverse" : "row")};
    align-items: stretch;

    & > * {
        // outline
        /* outline: 1px dotted blue; */

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        line-height: 1;
    }
`;

const DirectiveBlock = styled.div`
    ${(props) =>
        `border-${props.$reverse ? "left" : "right"}: ${rem(
            props.$sizeBraceThickness
        )} solid`};
    border-color: ${(props) => props.$colorBrace};

    position: relative;

    padding-right: ${(props) => rem(props.$sizeIndent)};
    padding-left: ${(props) => rem(props.$sizeIndent)};

    min-width: ${(props) => rem(props.$sizeDirectiveMinWidth)};

    &::before,
    &::after {
        position: absolute;
        content: "";
        right: 0;
        ${(props) => `${props.$reverse ? "left" : "right"}: 0;`}

        width: ${(props) => rem(props.$sizeEdgeBar)};
        height: ${(props) => rem(props.$sizeBraceThickness)};
        background-color: ${(props) => props.$colorBrace};
    }

    &::before {
        top: 0;
    }

    &::after {
        bottom: 0;
    }
`;

const PerceptiveBlock = styled.div`
    position: relative;

    padding-right: ${(props) =>
        rem(
            props.$reverse
                ? props.$sizeEdgeBar + props.$sizeIndent
                : props.$sizeIndent
        )};
    padding-left: ${(props) =>
        rem(
            props.$reverse
                ? props.$sizeIndent
                : props.$sizeEdgeBar + props.$sizeIndent
        )};

    &::before {
        position: absolute;
        content: "";

        ${(props) => `${props.$reverse ? "right" : "left"}: 0;`};
        top: ${(props) => `calc(50% - ${props.$sizeBraceThickness});`};

        width: ${(props) => rem(props.$sizeEdgeBar)};
        height: ${(props) => rem(props.$sizeBraceThickness)};

        background-color: ${(props) => props.$colorBrace};
    }
`;

function BraceBlock({
    contentDirective, // component or fragment
    contentReceptive, // component or fragment

    sizeDirectiveMinWidth = 80,
    sizeEdgeBar = 10,
    sizeIndent = 20,

    sizeBraceThickness = 3,
    colorBrace = "green",

    reverse = false,
}) {
    return (
        <Container $reverse={reverse}>
            <DirectiveBlock
                $sizeDirectiveMinWidth={sizeDirectiveMinWidth}
                $sizeBraceThickness={sizeBraceThickness}
                $sizeEdgeBar={sizeEdgeBar}
                $sizeIndent={sizeIndent}
                $colorBrace={colorBrace}
                $reverse={reverse}
            >
                {contentDirective}
            </DirectiveBlock>
            <PerceptiveBlock
                $sizeBraceThickness={sizeBraceThickness}
                $sizeEdgeBar={sizeEdgeBar}
                $sizeIndent={sizeIndent}
                $colorBrace={colorBrace}
                $reverse={reverse}
            >
                {contentReceptive}
            </PerceptiveBlock>
        </Container>
    );
}

export default BraceBlock;
