// Units

export function rem(px) {
    return +px / 16 + "rem";
}

// Numbers

export function getRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

// Strings

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function trimEndIfMatch(str, ending) {
    if (str.endsWith(ending)) {
        return str.slice(0, -ending.length);
    }
    return str;
}

export function assembleSentence(arr) {
    let sentence = arr.join(" ");

    // Remove spaces before punctuation marks
    sentence = sentence.replace(/\s([.,!?;:])/g, "$1");
    // Capitalize the first letter of the sentence
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);

    return sentence;
}

// Arrays

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

// Forms

export function getFormDataFromSubmitEvent(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    return formObject;
}

// Effects

export function updateLangAttribute(selectedLanguage) {
    document.documentElement.lang = selectedLanguage;
}
