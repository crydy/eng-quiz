export const testQuestions = [
    {
        question: "Who can run?",
        variants: ["turtle", "cat", "worm", "flower"],
        correctIndex: 1,
    },
    {
        question: "Are you an animal?",
        variants: ["Absolutely", "I am the god"],
        correctIndex: 0,
    },
];

export const testPhraseQuestions = [
    {
        question: "Она его любит?",
        phraseWords: ["does", "she", "love", "him", "?"],
        wrongWords: [],
    },
    {
        question: "Ты будешь это есть?",
        phraseWords: ["will", "you", "eat", "that", "?"],
        wrongWords: ["did", "were"],
    },
    {
        question: "Ты её видел?",
        phraseWords: ["have", "you", "seen", "her", "?"],
        wrongWords: ["did", "were", "see", "was"],
    },
];
