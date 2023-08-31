import { verbs } from "../data/verbs";
import {
    constructPresentSimpleNegative,
    constructPresentSimpleQuestion,
    modifyVerb,
} from "../utils/questionConstructors";

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
