import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const StyledToggleSet = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${(props) =>
        typeof props.$sizeTitleIndent === "string"
            ? props.$sizeTitleIndent
            : rem(props.$sizeTitleIndent)};
`;

const Title = styled.h3`
    font-size: ${(props) =>
        typeof props.$sizeFontTitle === "string"
            ? props.$sizeFontTitle
            : rem(props.$sizeFontTitle)};
`;

const RadioList = styled.ul`
    display: flex;
    ${(props) =>
        props.$colorDevider &&
        `gap: ${
            typeof props.$sizeDevider === "string"
                ? props.$sizeDevider
                : rem(props.$sizeDevider)
        };`}

    border-radius: 500px;
    overflow: hidden;
    background-color: ${(props) => props.$colorDevider};

    & li {
        & input {
            appearance: none;
            display: none;
        }

        & label {
            display: block;

            padding: 0.35em 0.8em;
            line-height: 1;
            font-size: ${(props) =>
                typeof props.$sizeFont === "string"
                    ? props.$sizeFont
                    : rem(props.$sizeFont)};

            background-color: ${(props) => props.$colorFill};

            cursor: pointer;

            &:hover {
                background-color: var(--color-button-bg-hover);
            }

            & > svg {
                display: block;
            }
        }

        & input[type="radio"]:checked + label {
            background-color: ${(props) => props.$colorActiveFill};
            color: ${(props) => props.$colorActiveText};

            &:hover {
                cursor: auto;
            }
        }
    }
`;

function ToggleSet({
    title = "Test title:",
    hideTitle = false,
    options = ["test 1", "test 2", "test 3"],
    optionsReplacingIcons = null,
    selectedOption = "test 1",

    onChange,

    // string: valid css-value (as '1em')
    // number: (px size implied, will converted px=>rem)
    sizeFont = "1em",
    sizeFontTitle = "1.5em",
    sizeTitleIndent = 8,
    sizeDevider = 0,

    colorFill = "green",
    colorActiveFill = "purple",
    colorActiveText = "white",
    colorDevider = "red",
}) {
    const handleRadioButtonChange = (e) => {
        onChange(e);
    };

    return (
        <StyledToggleSet $sizeTitleIndent={sizeTitleIndent}>
            {!hideTitle && (
                <Title $sizeFontTitle={sizeFontTitle}>{title}</Title>
            )}

            <RadioList
                $sizeFont={sizeFont}
                $sizeDevider={sizeDevider}
                $colorFill={colorFill}
                $colorActiveFill={colorActiveFill}
                $colorActiveText={colorActiveText}
                $colorDevider={colorDevider}
            >
                {options.map((option, index) => {
                    option = String(option);

                    return (
                        <li key={option}>
                            <input
                                type="radio"
                                id={option}
                                name={title}
                                value={option}
                                onClick={handleRadioButtonChange}
                                defaultChecked={option === selectedOption}
                            />
                            <label htmlFor={option}>
                                {optionsReplacingIcons?.at(index)
                                    ? optionsReplacingIcons.at(index)
                                    : option}
                            </label>
                        </li>
                    );
                })}
            </RadioList>
        </StyledToggleSet>
    );
}

export default ToggleSet;
