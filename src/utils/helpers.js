// Units

export function rem(px) {
    return +px / 16 + "rem";
}

// Strings

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
