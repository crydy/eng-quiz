import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const StyledToggleSet = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${(props) => rem(props.$sizeTitleIndent)};
`;

const Title = styled.h3`
    font-size: min(8vw, 40px);
`;

const RadioList = styled.ul`
    display: flex;
    ${(props) => props.$colorDevider && `gap: ${rem(props.$sizeDevider)};`}

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
            /* font-size: ${(props) => rem(props.$sizeFont)}; */
            font-size: min(5vw, 25px);

            background-color: ${(props) => props.$colorFill};
            line-height: 1;
            padding: 0.35em 0.8em;
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
    title = "test",
    options = ["test 1", "test 2", "test 3"],
    optionsReplacingIcons = null,
    selectedOption = "test 1",
    onChange,
    sizeFont = 16,
    sizeFontTitle = sizeFont * 1.2,
    sizeTitleIndent = 8,
    sizeDevider = 0,
    colorFill = "green",
    colorActiveFill = "purple",
    colorActiveText = "white",
    colorDevider = "red",
    hideTitle = false,
}) {
    const handleRadioButtonChange = (e) => {
        onChange(e);
    };

    return (
        <StyledToggleSet
            $sizeTitleIndent={sizeTitleIndent}
            $sizeFontTitle={sizeFontTitle}
        >
            {!hideTitle && <Title>{title}</Title>}
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
