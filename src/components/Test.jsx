import { verbs } from "../data/verbs";
import { modifyVerb } from "../utils/helpers";

function Test() {
    const allVerbs = verbs.n200;

    return (
        <div style={{ textWrap: "wrap" }}>
            {allVerbs.map((verb) => (
                <span>
                    {verb} - {modifyVerb(verb)}; {""}
                </span>
            ))}
        </div>
    );
}

export default Test;
