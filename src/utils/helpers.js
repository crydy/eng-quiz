export function rem(px) {
    return +px / 16 + "rem";
}

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function constructPresentSimplePhrase(pronoun, verb) {
    const transformerPronouns = ["he", "she", "it"];

    if (!transformerPronouns.includes(pronoun.toLowerCase()))
        return `${pronoun} ${verb}`;

    return `${pronoun} ${modifyVerb(verb)}`;
}

function modifyVerb(verb) {
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

export function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

export function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export function getRandomItems(array, count) {
    if (count > array.length) {
        throw new Error("Count exceeds array length");
    }

    const randomIndices = new Set();
    while (randomIndices.size < count) {
        const randomIndex = Math.floor(Math.random() * array.length);
        randomIndices.add(randomIndex);
    }

    return Array.from(randomIndices).map((index) => array[index]);
}

export function getShuffledArrayCopy(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

export function constructQuestions(propronouns, verbs, amount = 30) {
    const numberOfQuestions = Math.min(verbs.length, amount);

    const choosenVerbs = getRandomItems(verbs, numberOfQuestions);
    const transformerPronouns = ["he", "she", "it"];

    const result = choosenVerbs.map((verb) => {
        const pronoun = getRandomItem(propronouns);

        const rightVariant = constructPresentSimplePhrase(pronoun, verb);
        const wrongVariant = transformerPronouns.includes(pronoun)
            ? `${pronoun} ${verb}`
            : `${pronoun} ${modifyVerb(verb)}`;

        const variants = getShuffledArrayCopy([rightVariant, wrongVariant]);

        return {
            question: `"${pronoun}" + "to ${verb}"`,
            variants,
            correctIndex: variants.indexOf(rightVariant),
        };
    });

    return result;
}
