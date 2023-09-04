import { styled } from "styled-components";
import { rem } from "../../utils/helpers";

const StyledToggleSet = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => rem(props.$sizeTitleIndent)};

    & > h3 {
        font-size: ${(props) => rem(props.$sizeFontTitle)};
    }
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
        }

        & label {
            font-size: ${(props) => rem(props.$sizeFont)};

            background-color: ${(props) => props.$colorFill};
            padding: ${rem(8)} ${rem(20)};
            cursor: pointer;
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
    selectedOption,
    onChange,
    sizeFont = 36,
    sizeFontTitle = sizeFont * 1.2,
    sizeTitleIndent = 16,
    sizeDevider = 0,
    colorFill = "green",
    colorActiveFill = "purple",
    colorActiveText = "white",
    colorDevider = "red",
    hideTitle = false,
}) {
    console.log(selectedOption);

    const handleRadioButtonChange = (e) => {
        onChange(e);
    };

    return (
        <StyledToggleSet
            $sizeTitleIndent={sizeTitleIndent}
            $sizeFontTitle={sizeFontTitle}
        >
            {!hideTitle && <h3>{title}</h3>}
            <RadioList
                $sizeFont={sizeFont}
                $sizeDevider={sizeDevider}
                $colorFill={colorFill}
                $colorActiveFill={colorActiveFill}
                $colorActiveText={colorActiveText}
                $colorDevider={colorDevider}
            >
                {options.map((option) => {
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
                            <label htmlFor={option}>{option}</label>
                        </li>
                    );
                })}
            </RadioList>
        </StyledToggleSet>
    );
}

export default ToggleSet;
