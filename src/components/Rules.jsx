import { styled } from "styled-components";
import { rem, trimEndIfMatch } from "../utils/helpers";

const Grid = styled.div`
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
`;

const MarkedSpan = styled.span`
    text-decoration: underline;
    text-decoration-color: var(--color-text-rules-underline-mark);
`;

function Rules({
    title = "Present simple: questions",
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

    const [mainTitle, subTitle] = title.split(":");
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
            {mainTitle && !noTitle && <MainTitle>{mainTitle}</MainTitle>}
            {subTitle && !noSubtitle && <SubTitle>- {subTitle} -</SubTitle>}

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

export default Rules;
