import { getRandomItem, getRandomItems, getShuffledArrayCopy } from "./helpers";

export function constructWordsCheckingQuestionsPack(
    wordsTargets,
    wordsVariants,
    amount,
    variantsAmount = 3
) {
    const questions = [];

    for (let i = 0; i < amount; i++) {
        let nextQuestion;

        // avoid repeating previous question
        do {
            nextQuestion = constructWordsCheckingQuestion(
                wordsTargets,
                wordsVariants
            );
        } while (
            questions.at(-1) &&
            nextQuestion.question === questions.at(-1).question
        );

        questions.push(nextQuestion);
    }

    return questions;

    function constructWordsCheckingQuestion(wordsTargets, wordsVariants) {
        const wordCouples = wordsTargets.map((word, index) => [
            word,
            wordsVariants[index],
        ]);

        const targetCouple = getRandomItem(wordCouples);

        let variants = getRandomItems(wordsVariants, variantsAmount);

        if (!variants.includes(targetCouple.at(1))) {
            variants.pop(); // keep same quantity
            variants.push(targetCouple.at(1));
        }

        variants = getShuffledArrayCopy(variants);

        return {
            question: targetCouple.at(0),
            variants,
            correctIndex: variants.findIndex(
                (word) => word === targetCouple.at(1)
            ),
        };
    }
}

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
        positives: true,
        negatives: false,
        questions: false,
    }
) {
    const { positives, negatives, questions } = options;

    let questionsTypes = [];

    if (positives)
        questionsTypes.push({
            type: "positives",
            func: constructPresentSimplePositive,
        });
    if (negatives)
        questionsTypes.push({
            type: "negatives",
            func: constructPresentSimpleNegative,
        });
    if (questions)
        questionsTypes.push({
            type: "questions",
            func: constructPresentSimpleQuestion,
        });

    const numberOfQuestions = Math.min(verbs.length, amount);

    const choosenVerbs = getRandomItems(verbs, numberOfQuestions);

    const result = choosenVerbs.map((verb) => {
        const pronoun = getRandomItem(propronouns);
        const { type: questionType, func: questionFunc } =
            getRandomItem(questionsTypes);

        const rightVariant = questionFunc(pronoun, verb).correct;
        const wrongVariant = questionFunc(pronoun, verb).wrong;

        const variants = getShuffledArrayCopy([rightVariant, wrongVariant]);

        return {
            question: `${pronoun} + ${verb}`,
            variants,
            correctIndex: variants.indexOf(rightVariant),
            type: questionType,
        };
    });

    return result;
}
