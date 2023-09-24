import QuizPartOfSpeach from "./QuizPartOfSpeach";

function QuizQuestionWithPartsOfSpeach({ partsOfSpeach, children }) {
    const [pronoun, sign, verb] = children.split(" ");

    return (
        <span>
            <QuizPartOfSpeach nature={partsOfSpeach.at(0)}>
                {pronoun}
            </QuizPartOfSpeach>{" "}
            {sign}{" "}
            <QuizPartOfSpeach nature={partsOfSpeach.at(1)}>
                {verb}
            </QuizPartOfSpeach>
        </span>
    );
}

export default QuizQuestionWithPartsOfSpeach;
