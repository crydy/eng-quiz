import { styled } from "styled-components";
import { rem } from "../utils/helpers";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${(props) => props.$columnsAmount}, auto);
    gap: ${rem(15)};

    line-height: 1;
    margin: ${rem(25)};
`;

const MainTitle = styled.h2`
    font-size: ${rem(40)};
`;

const SubTitle = styled.h3`
    font-size: ${rem(35)};
`;

const Cell = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: ${rem(15)};

    outline: 1px solid var(--color-text-main);
`;

function Rules({
    title = "Present simple: questions",
    content = [
        [["do"], ["I", "you", "we", "they"], ["love?"]],
        [["does"], ["he", "she", "it"], ["love?"]],
    ],
}) {
    const columnsAmount = content[0].length;

    const contentPlain = content.reduce((acc, cur) => {
        return [...acc, ...cur];
    }, []);

    const [mainTitle, subTitle] = title.split(":");

    return (
        <>
            <MainTitle>{mainTitle}</MainTitle>
            <SubTitle>- {subTitle} -</SubTitle>

            <Grid $columnsAmount={columnsAmount}>
                {contentPlain.map((set) => (
                    <Cell>
                        {set.map((word) => (
                            <span>{word}</span>
                        ))}
                    </Cell>
                ))}
            </Grid>
        </>
    );
}

export default Rules;
