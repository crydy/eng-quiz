import { styled } from "styled-components";
import { rem, trimEndIfMatch } from "../../utils/helpers";
import { englishFontOnly } from "../../styles/styles";

const Grid = styled.div`
    ${englishFontOnly};

    display: grid;
    grid-template-columns: repeat(${(props) => props.$columnsAmount}, auto);
    gap: ${rem(5)};

    margin: ${rem(10)};

    font-size: clamp(${rem(10)}, 4vw, ${rem(16)});
    line-height: 1;
`;

const MainTitle = styled.h2`
    font-size: ${rem(24)};
`;

const SubTitle = styled.h3`
    font-size: ${rem(18)};
`;

const Cell = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: ${rem(8)};

    outline: ${rem(1)} solid var(--color-text-main);
    border-radius: ${rem(6)};
`;

const MarkedSpan = styled.span`
    text-decoration: underline;
    text-decoration-color: var(--color-text-rules-underline-mark);
`;

function Table({
    title = "Present simple: questions",
    subtitle = "Subtitle example",
    content = [
        [["do"], ["I", "you", "we", "they"], ["love?"]],
        [["does"], ["he", "she", "it"], ["love?"]],
    ],
    mark = ["does", "es"],

    noTitle = false,
    noSubtitle = false,
}) {
    const columnsAmount = content[0].length;

    const contentPlain = content.reduce((acc, cur) => {
        return [...acc, ...cur];
    }, []);

    const [string, substrToMark] = mark;

    function markLetters(word) {
        if (word !== string) return <span>{word}</span>;
        else
            return (
                <>
                    {trimEndIfMatch(string, substrToMark)}
                    <MarkedSpan>{substrToMark}</MarkedSpan>
                </>
            );
    }

    return (
        <>
            {title && !noTitle && <MainTitle>{title}</MainTitle>}
            {subtitle && !noSubtitle && <SubTitle>{subtitle}</SubTitle>}

            <Grid $columnsAmount={columnsAmount}>
                {contentPlain.map((set) => (
                    <Cell>
                        {set.map((word) => (
                            <span>{markLetters(word)}</span>
                        ))}
                    </Cell>
                ))}
            </Grid>
        </>
    );
}

export default Table;
