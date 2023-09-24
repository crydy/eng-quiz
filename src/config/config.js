const config = {
    base: "/eng-quiz/",
    localStoragePrefix: "12",
    defaultLanguage: "ru",

    quistionsAmount: {
        default: 15,
        min: 10,
        max: 30,
    },

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
