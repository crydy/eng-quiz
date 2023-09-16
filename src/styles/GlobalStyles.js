import { createGlobalStyle } from "styled-components";
import { rem } from "../utils/helpers";

const GlobalStyles = createGlobalStyle`

:root {
    /************************ Fonts *************************
    font-family: 'Kanit', sans-serif;             // 300, 500
    font-family: 'Yanone Kaffeesatz', sans-serif; // 300, 500
    font-family: 'Share Tech Mono', monospace;          
    ********************************************************/

    // en => 'Kanit' (russian not supported)
    // ru => 'Yanone Kaffeesatz'
    --font-main: 'Kanit', 'Yanone Kaffeesatz', sans-serif;
    --font-numbers: "Share Tech Mono", monospace;

    /************************ Sizings ***********************/
    
    --size-max-width: ${rem(600)};
    --size-top-bar-height: 6vh;
    --size-body-height: calc(100vh - var(--size-top-bar-height));

    --z-index-modal: 50;
    --z-index-dropdown: 40;
    --z-index-header: 30;
    --z-index-sidebar: 20;
    --z-index-overlay: 10;

    /************************ Colors ************************/

    --color-bg: #011627;

    /* --color-text-main: #C2A83E; */
    /* --color-text-main: #fbf9d8; */
    --color-text-main: #d6d2a6;
    --color-text-neutral: #c0c0c0;

    --color-text-part-of-speach: #4c956c;
    --color-text-rules-underline-mark: var(--color-text-part-of-speach);

    --color-text-result-correct: lightgreen;
    --color-text-result-average: #f77f00;
    --color-text-result-wrong: red;

    --color-button-bg: #243E36;
    --color-button-text: var(--color-text-main);
    --color-button-bg-hover: #bb3e03;

    --color-variant-button-bg: #3d405b;
    --color-variant-button-bg-hover: var(--color-button-bg-hover);
    --color-variant-button-bg-correct: #31572c;
    --color-variant-button-bg-wrong: #800e13;
    --color-variant-button-text: var(--color-text-main);

    --color-quiz-heading-correct: var(--color-button-bg-correct);
    --color-quiz-heading-wrong: var(--color-button-bg-wrong);
    
    --color-progress-bar: #93a8ac;
    --color-progress-bar-fill: var(--color-button-bg);
    
    --color-range-track: var(--color-button-bg);
    --color-range-thumb: var(--color-text-main);

    --color-brace: var(--color-text-part-of-speach);

    &.color-theme-light {
        --color-bg: #F0F8FF;

        --color-text-main: #283618;

        --color-button-bg: #85B09A;
        --color-button-text: var(--color-text-main);
        --color-button-bg-hover: #F4C430;

        --color-variant-button-bg: lightgray;
        --color-variant-button-bg-hover: var(--color-button-bg-hover);
        --color-variant-button-bg-correct: #80ed99;
        --color-variant-button-bg-wrong: #f57777;

        --color-progress-bar: #E5E4E2;
        --color-progress-bar-fill: var(--color-button-bg);

        --color-text-result-correct: green;
    }
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

body {
    min-height: 100vh;
    min-width: max-content;
    overflow-x: hidden;

    font-family: var(--font-main); // 300 and 500
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

body {
    font-size: min(6vw, 20px);
}

h1 {
    font-size: 2.7em;
}

h2 {
    font-size: 2em;
}

h3 {
    font-size: 1.5em;
}

h4 {
    font-size: 1.3em;
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
