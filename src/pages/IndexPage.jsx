import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { langPack } from "../data/langPack";
import { useQuiz } from "../contexts/QuizContext";
import { doubleLine } from "../styles/stylesPatterns";
import { modules } from "../main";

const StyledIndexPage = styled.div`
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-bottom: 15vh;

    & > h1 {
        ${doubleLine}
        padding: .3em 0 .4em;
        margin-bottom: 0.6em;
    }

    & > div {
        text-align: left;

        & > h2 {
            font-size: 1.2em;
            line-height: 1.6;
        }

        & > ul {
            list-style: circle;
        }
    }

    & > h2 {
        margin-bottom: 0.3em;
    }
`;

const StyledLink = styled(Link)``;

function IndexPage() {
    const { lang } = useQuiz();

    return (
        <StyledIndexPage>
            <h1>{langPack.appTitle[lang]}</h1>

            <div>
                <h2>{langPack.tastChoiceTitle[lang]}</h2>
                <ul>
                    {modules
                        .map((module) => (
                            <li key={module.title}>
                                <StyledLink to={module.path}>
                                    {lang === "en"
                                        ? module.title
                                        : module.titleRu}
                                </StyledLink>
                            </li>
                        ))
                        .slice(1)}
                </ul>
            </div>
        </StyledIndexPage>
    );
}

export default IndexPage;
