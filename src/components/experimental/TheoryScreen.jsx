import { styled } from "styled-components";
import BraceBlock from "./BraceBlock";

const StyledTheoryScreen = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

function TheoryScreen() {
    return (
        <StyledTheoryScreen>
            <BraceBlock
                contentDirective={
                    <>
                        {["I", "you", "we", "they"].map((item) => (
                            <span>{item}</span>
                        ))}
                    </>
                }
                contentReceptive={
                    <>
                        <span>love</span>
                    </>
                }
                sizeDirectiveMinWidth={125}
                colorBrace="var(--color-brace)"
            />

            <BraceBlock
                contentDirective={["he", "she", "it"].map((item) => (
                    <span>{item}</span>
                ))}
                contentReceptive={
                    <>
                        <span>
                            love
                            <span style={{ color: "var(--color-brace)" }}>
                                s
                            </span>
                        </span>
                    </>
                }
                sizeDirectiveMinWidth={125}
                colorBrace="var(--color-brace)"
            />
        </StyledTheoryScreen>
    );
}

export default TheoryScreen;
