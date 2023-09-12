import { css } from "styled-components";
import { rem } from "../utils/helpers";

export const flexColumn = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const flexRow = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
`;

export const doubleLine = css`
    position: relative;

    &::before,
    &::after {
        content: "";
        position: absolute;

        left: 50%;
        width: calc(100% + ${rem(22)});
        height: ${rem(2)};
        background-color: var(--color-text-main);
        transform: translateX(-50%);
    }

    &::before {
        top: 0;
    }
    &::after {
        bottom: 0;
    }
`;
