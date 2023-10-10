import { getRandomItem } from "../../utils/helpers";

const questionBase = [
    {
        // order: present simple
        phraseWords: ["does", "she", "love", "him", "?"],
        questionVariants: [
            "Она его любит?", //          1. present
            "Она его любила?", //         2. past
            "Она будет его любить?", //   3. future
        ],
    },
    {
        phraseWords: ["do", "we", "feel", "it", "?"],
        questionVariants: [
            "Мы чувствуем это?",
            "Мы это чувствовали?",
            "Мы это почувствуем?",
        ],
    },
    {
        phraseWords: ["do", "you", "see", "that", "?"],
        questionVariants: [
            "Ты это видишь?",
            "Ты это видел?",
            "Ты это увидишь?",
        ],
    },
    {
        phraseWords: ["do", "they", "hate", "him", "?"],
        questionVariants: [
            "Они ненавидят его?",
            "Они ненавидели его?",
            "Они будут ненавидеть его?",
        ],
    },
    {
        phraseWords: ["does", "he", "study", "English", "?"],
        questionVariants: [
            "Он изучает английский?",
            "Он изучал английский?",
            "Он будет изучать английский?",
        ],
    },
    {
        phraseWords: ["do", "you", "play", "chess", "?"],
        questionVariants: [
            "Ты играешь в шахматы?",
            "Ты играл в шахматы?",
            "Ты будешь играть в шахматы?",
        ],
    },
    {
        phraseWords: ["does", "it", "hurt", "us", "?"],
        questionVariants: [
            "Это делает нам больно?",
            "Это делало нам больно?",
            "Это будет делать нам больно?",
        ],
    },
    {
        phraseWords: ["do", "we", "get", "it", "?"],
        questionVariants: [
            "Мы получаем это?",
            "Мы получили это?",
            "Мы получим это?",
        ],
    },
    {
        phraseWords: ["does", "he", "watch", "TV", "?"],
        questionVariants: [
            "Он смотрит телевизор?",
            "Он смотрел телевизор?",
            "Он будет смотреть телевизор?",
        ],
    },
    {
        phraseWords: ["does", "she", "play", "piano", "?"],
        questionVariants: [
            "Она играет на пианино?",
            "Она играла на пианино?",
            "Она будет играть на пианино?",
        ],
    },
    {
        phraseWords: ["does", "he", "read", "books", "?"],
        questionVariants: [
            "Он читает книги?",
            "Он читал книги?",
            "Он будет читать книги?",
        ],
    },
    {
        phraseWords: ["do", "they", "watch", "movies", "?"],
        questionVariants: [
            "Они смотрят фильмы?",
            "Они смотрели фильмы?",
            "Они будут смотреть фильмы?",
        ],
    },
    {
        phraseWords: ["does", "she", "visit", "your", "family", "?"],
        questionVariants: [
            "Она навещает твою семью?",
            "Она навещала твою семью?",
            "Она будет навещать твою семью?",
        ],
    },
    {
        phraseWords: ["does", "he", "fix", "computers", "?"],
        questionVariants: [
            "Он чинит компьютеры?",
            "Он чинил компьютеры?",
            "Он будет чинить компьютеры?",
        ],
    },
];

function constructQuestion(tense, question) {
    switch (tense) {
        case "present":
            return {
                question: question.questionVariants[0],
                phraseWords: question.phraseWords,
                wrongWords: ["will", "did"],
            };

        case "past":
            return {
                question: question.questionVariants[1],
                phraseWords: question.phraseWords.map((word, index) => {
                    return index === 0 ? "did" : word;
                }),
                wrongWords: ["will", "does", "do"],
            };

        case "future":
            return {
                question: question.questionVariants[2],
                phraseWords: question.phraseWords.map((word, index) => {
                    return index === 0 ? "will" : word;
                }),
                wrongWords: ["does", "did", "do"],
            };

        default:
            break;
    }
}

function constructQuestionsPack(
    questionsAmount,
    tenseVariants = ["past", "present", "future"]
) {
    const questions = [];

    for (let i = 0; i < questionsAmount; i++) {
        let nextQuestion;

        // avoid repeating previous question
        do {
            nextQuestion = constructQuestion(
                getRandomItem(tenseVariants),
                getRandomItem(questionBase)
            );
        } while (
            questions.at(-1) &&
            nextQuestion.question === questions.at(-1).question
        );

        questions.push(nextQuestion);
    }

    return questions;
}

export { constructQuestionsPack };
