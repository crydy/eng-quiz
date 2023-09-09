import { config } from "./config";

const UNIQUE_PREFIX = config.localStoragePrefix;

const LOCAL_STORAGE_KEY = {
    userLanguage: `${UNIQUE_PREFIX}_userLanguage`,
    userColorTheme: `${UNIQUE_PREFIX}_userColorTheme`,

    questionsAmount: `${UNIQUE_PREFIX}_questionsAmount`,
    questionsTypes: `${UNIQUE_PREFIX}_questionsTypes`,
    verbsVariety: `${UNIQUE_PREFIX}_verbsVariety`,
};

export { LOCAL_STORAGE_KEY };
