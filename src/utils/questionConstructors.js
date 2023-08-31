import { getRandomItem, getRandomItems, getShuffledArrayCopy } from "./helpers";

export function constructPresentSimplePositive(pronoun, verb) {
    const transformerPronouns = ["he", "she", "it"];

    return transformerPronouns.includes(pronoun.toLowerCase())
        ? {
              correct: `${pronoun} ${modifyVerb(verb)}`,
              wrong: `${pronoun} ${verb}`,
          }
        : {
              correct: `${pronoun} ${verb}`,
              wrong: `${pronoun} ${modifyVerb(verb)}`,
          };
}

export function constructPresentSimpleNegative(pronoun, verb) {
    const transformerPronouns = ["he", "she", "it"];

    const baseNegations = ["don't", "do not"];
    const transNegations = ["doesn't", "does not"];

    return transformerPronouns.includes(pronoun.toLowerCase())
        ? {
              correct: `${pronoun} ${getRandomItem(transNegations)} ${verb}`,
              wrong: `${pronoun} ${getRandomItem(baseNegations)} ${verb}`,
          }
        : {
              correct: `${pronoun} ${getRandomItem(baseNegations)} ${verb}`,
              wrong: `${pronoun} ${getRandomItem(transNegations)} ${verb}`,
          };
}

export function constructPresentSimpleQuestion(pronoun, verb) {
    const transformerPronouns = ["he", "she", "it"];

    return transformerPronouns.includes(pronoun.toLowerCase())
        ? {
              correct: `does ${pronoun} ${verb}?`,
              wrong: `do ${pronoun} ${verb}?`,
          }
        : {
              correct: `do ${pronoun} ${verb}?`,
              wrong: `does ${pronoun} ${verb}?`,
          };
}

export function modifyVerb(verb) {
    const esEndings = ["o", "sh", "ch", "x", "ss", "zz"];

    for (const ending of esEndings) {
        if (verb.endsWith(ending)) {
            return `${verb + "es"}`;
        }
    }

    if (verb.endsWith("y")) {
        if (
            verb.endsWith("ay") ||
            verb.endsWith("ey") ||
            verb.endsWith("oy") ||
            verb.endsWith("uy")
        )
            return verb + "s";

        return verb.slice(0, -1) + "ies";
    } else {
        return verb + "s";
    }
}

export function constructQuestions(
    propronouns,
    verbs,
    amount = 30,
    options = {
        positives: false,
        negatives: false,
        questions: true,
    }
) {
    const { positives, negatives, questions } = options;

    let questionsTypes = [];
    if (positives) questionsTypes.push(constructPresentSimplePositive);
    if (negatives) questionsTypes.push(constructPresentSimpleNegative);
    if (questions) questionsTypes.push(constructPresentSimpleQuestion);

    const numberOfQuestions = Math.min(verbs.length, amount);

    const choosenVerbs = getRandomItems(verbs, numberOfQuestions);

    const result = choosenVerbs.map((verb) => {
        const pronoun = getRandomItem(propronouns);
        const questionFunc = getRandomItem(questionsTypes);

        const rightVariant = questionFunc(pronoun, verb).correct;
        const wrongVariant = questionFunc(pronoun, verb).wrong;

        const variants = getShuffledArrayCopy([rightVariant, wrongVariant]);

        return {
            question: `"${pronoun}" + "${verb}"`,
            variants,
            correctIndex: variants.indexOf(rightVariant),
        };
    });

    return result;
}
