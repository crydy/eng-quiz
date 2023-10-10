import { Link } from "react-router-dom";
import { styled } from "styled-components";

import { useLang } from "../contexts/LangContext";
import { modules } from "../main";
import { langPack } from "../data/langPack";

const StyledIndexPage = styled.div`
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-bottom: 15vh;

    & > h1 {
        padding: 0.2em 0;
        margin-bottom: 0.6em;
    }

    & > div {
        & > h2 {
            font-size: 1.2em;
            line-height: 1.6;
            margin-bottom: 0.6em;
        }

        & > ul {
            display: flex;
            flex-direction: column;
            gap: 0.5em;
        }
    }

    & > h2 {
        margin-bottom: 0.3em;
    }
`;

const StyledLink = styled(Link)`
    display: block;
    width: 100%;
    line-height: 1;

    border-radius: 100px;
    padding: 0.4em 1.2em;

    color: var(--color-button-text);
    background-color: var(--color-button-bg);

    &:not(:disabled):hover {
        background-color: var(--color-button-bg-hover);
    }
`;

function IndexPage() {
    const { lang } = useLang();

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
