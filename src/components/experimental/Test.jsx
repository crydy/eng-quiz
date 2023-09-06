import { verbs } from "../data/verbs";
import { constructPresentSimpleQuestion } from "../utils/questionConstructors";

function Test() {
    const allVerbs = verbs.n200;

    return (
        <div style={{ textWrap: "wrap" }}>
            {allVerbs.map((verb) => (
                <span>{constructPresentSimpleQuestion("she", verb)}, </span>
            ))}
        </div>
    );
}

export default Test;
