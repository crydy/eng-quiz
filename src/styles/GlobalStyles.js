import { createGlobalStyle } from "styled-components";
import { rem } from "../utils/helpers";

const GlobalStyles = createGlobalStyle`

:root {
    --color-bg: #011627;
    --color-text-main: #C2A83E;

    --color-button-bg: #243E36;
    --color-button-text: #c0c0c0;
    --color-button-bg-hover: #003249;

    --color-variant-button-bg: #3d405b;
    --color-variant-button-bg-hover: #003249;
    --color-variant-button-bg-correct: #4f772d;
    --color-variant-button-bg-wrong: #9d0208;
    --color-variant-button-text: #c0c0c0;

    --color-quiz-heading-correct: var(--color-button-bg-correct);
    --color-quiz-heading-wrong: var(--color-button-bg-wrong);

    --size-max-width: ${rem(600)};
}

*,
*::before,
*::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    user-select: none;

    /* transition for dark mode */
    transition: background-color 0.3s, border 0.3s;
    /* remove the blue blinking highlight on click event on mobile */
    -webkit-tap-highlight-color: transparent;
}

body, html {
    display: flex;
    justify-content: center;
    align-items: center;
}

html {
    font-size: 62.5%;
}

body {
    min-height: 100vh;
    min-width: max-content;
    overflow-x: hidden;

    /* font-family: "Share Tech Mono", monospace; */
    font-family: 'Kanit', sans-serif; // 300 and 500
    line-height: 1.5;
    font-size: 1.9rem;
    font-weight: 300;

    color: var(--color-text-main);
    background-color: var(--color-bg);
    transition: color 0.3s, background-color 0.3s;
}

input,
button,
textarea,
select {
    font: inherit;
    color: inherit;
}

button {
    cursor: pointer;
}

*:disabled {
    cursor: not-allowed;
}

select:disabled,
input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
}

button:has(svg) {
    line-height: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

ul {
    list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
    overflow-wrap: break-word;
    hyphens: auto;
    line-height: 1;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: 500;
}

img {
    max-width: 100%;
}
`;

export default GlobalStyles;
