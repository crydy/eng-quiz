import { config } from "./config";

const UNIQUE_PREFIX = config.localStoragePrefix;

const LOCAL_STORAGE_KEY = {
    userLanguage: `${UNIQUE_PREFIX}_userLanguage`,
    userColorTheme: `${UNIQUE_PREFIX}_userColorTheme`,

    isEngToRusDirection: `${UNIQUE_PREFIX}isEngToRusDirection`,

    questionsAmount: `${UNIQUE_PREFIX}_questionsAmount`,
    questionsAmountHardTasks: `${UNIQUE_PREFIX}_questionsAmountHardTasks`,

    wordsVariety: `${UNIQUE_PREFIX}_wordsVariety`,

    pronounsVariant: `${UNIQUE_PREFIX}pronounsVariant`,

    pronAndVerbQuestionsTypes: `${UNIQUE_PREFIX}_pronAndVerbQuestionsTypes`,
    verbsVariety: `${UNIQUE_PREFIX}_verbsVariety`,

    presentSimpleQuestionTypes: `${UNIQUE_PREFIX}_presentSimpleQuestionTypes`,
};

export { LOCAL_STORAGE_KEY };
