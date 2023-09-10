const rulesData = {
    presentSimpleTableData: {
        positives: {
            title: "Present simple: positives",
            content: [
                [["I", "you", "we", "they"], ["love"]],
                [["he", "she", "it"], ["loves"]],
            ],
            mark: ["loves", "s"],
        },
        negatives: {
            title: "Present simple: negatives",
            content: [
                [["I", "you", "we", "they"], ["don't", "(do not)"], ["love"]],
                [["he", "she", "it"], ["doesn't", "(does not)"], ["love"]],
            ],
            mark: [],
        },
        questions: {
            title: "Present simple: questions",
            content: [
                [["do"], ["I", "you", "we", "they"], ["love?"]],
                [["does"], ["he", "she", "it"], ["love?"]],
            ],
            mark: ["does", "es"],
        },
    },
    presentSimplePositiveVerbsMutation: [
        [
            ["-o", "-ss", "-sh", "-ch", "-x"],
            ["go", "pass", "push", "watch", "mix"],
            ["+es"],
            ["goes", "passes", "pushes", "watches", "mixes"],
        ],
        // [
        //     ["-ay", "-ey", "-oy", "-uy"],
        //     ["play", "obey", "endjoy", "buy"],
        //     ["+s"],
        //     ["plays", "obeys", "endjoys", "buys"],
        // ],
        [
            ["consonant", "& -y"],
            ["try", "cry", "study"],
            ["-y", "+ies"],
            ["tries", "cries", "studies"],
        ],
        // [
        //     ["...other", "cases"],
        //     ["like", "check", "read", "travel"],
        //     ["+s"],
        //     ["likes", "checks", "reads", "travels"],
        // ],
    ],
};

export { rulesData };
