import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const RangeInput = styled.input.attrs({ type: "range" })`
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;

    /* Removes default focus */
    &:focus {
        outline: none;
    }

    /******** Chrome, Safari, Opera and Edge Chromium styles ********/
    /* slider track */
    &::-webkit-slider-runnable-track {
        background-color: ${(props) => props.$trackColor};
        border-radius: ${(props) => rem(props.$trackBorderRadius)};
        height: ${(props) => rem(props.$trackHeight)};
    }

    /* slider thumb */
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        margin-top: ${(props) =>
            rem(props.$trackHeight / 2 + (props.$thumbSize / 2) * -1)};
        background-color: ${(props) => props.$thumbColor};
        border-radius: ${(props) => rem(props.$thumbBorderRadius)};
        height: ${(props) => rem(props.$thumbSize)};
        width: ${(props) => rem(props.$thumbSize)};
    }

    &:focus::-webkit-slider-thumb {
        outline: ${(props) => rem(props.$outlineSize)} solid
            ${(props) => props.$thumbOutlineColor};
        outline-offset: ${(props) => rem(props.$outlineOffset)};
    }

    /*********** Firefox styles ***********/
    /* slider track */
    &::-moz-range-track {
        background-color: ${(props) => props.$trackColor};
        border-radius: ${(props) => rem(props.$trackBorderRadius)};
        height: ${(props) => rem(props.$trackHeight)};
    }

    /* slider thumb */
    &::-moz-range-thumb {
        background-color: ${(props) => props.$thumbColor};
        border: none;
        border-radius: ${(props) => rem(props.$thumbBorderRadius)};
        height: ${(props) => rem(props.$thumbSize)};
        width: ${(props) => rem(props.$thumbSize)};
    }

    &:focus::-moz-range-thumb {
        outline: ${(props) => rem(props.$outlineSize)} solid
            ${(props) => props.$thumbOutlineColor};
        outline-offset: ${(props) => rem(props.$outlineOffset)};
    }
`;

function Range(props) {
    const trackColor = "var(--color-range-track)";
    const thumbColor = "var(--color-range-thumb)";
    const thumbOutlineColor = thumbColor;

    const thumbSize = 30;
    const thumbBorderRadius = 50;

    const trackHeight = 10;
    const trackBorderRadius = 100;

    const outlineSize = 4;
    const outlineOffset = 5;

    return (
        <RangeInput
            $thumbColor={thumbColor}
            $thumbOutlineColor={thumbOutlineColor}
            $trackColor={trackColor}
            $thumbSize={thumbSize}
            $thumbBorderRadius={thumbBorderRadius}
            $trackHeight={trackHeight}
            $trackBorderRadius={trackBorderRadius}
            $outlineSize={outlineSize}
            $outlineOffset={outlineOffset}
            {...props}
        />
    );
}

export default Range;
