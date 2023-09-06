import { config } from "./config";

const UNIQUE_PREFIX = config.localStoragePrefix;

const LOCAL_STORAGE_KEY = {
    questionsAmount: `${UNIQUE_PREFIX}_questionsAmount`,
    questionsTypes: `${UNIQUE_PREFIX}_questionsTypes`,
    verbsVariety: `${UNIQUE_PREFIX}_verbsVariety`,

    userLanguage: `${UNIQUE_PREFIX}_userLanguage`,
};

export { LOCAL_STORAGE_KEY };
