const config = {
    base: "/eng-verbs-quiz/",
    localStoragePrefix: "09",
    defaultLanguage: "ru",

    colorThemes: {
        classNamesPrefix: "color-theme-",
        classNames: {
            light: "color-theme-light",
            dark: "color-theme-dark",
        },

        getDefaultClassName() {
            return this.classNames.light;
        },
    },
};

export { config };
