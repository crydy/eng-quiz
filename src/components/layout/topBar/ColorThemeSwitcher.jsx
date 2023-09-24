import { HiMoon } from "react-icons/hi";
import { FaSun } from "react-icons/fa";

import { useColorTheme } from "../../../contexts/ColorThemeContext";
import { config } from "../../../config/config";

import ToggleSet from "../../ui/ToggleSet";

function ColorThemeSwitcher({ size }) {
    const { colorTheme, setColorTheme } = useColorTheme();

    const options = [
        {
            className: config.colorThemes.classNames.dark,
            label: "dark",
            icon: <HiMoon key="dark" />,
        },
        {
            className: config.colorThemes.classNames.light,
            label: "light",
            icon: <FaSun key="light" />,
        },
    ];

    const currentOption = options.find((item) => item.className === colorTheme);

    const handleThemeToggle = (e) => {
        setColorTheme(
            options.find((item) => item.label === e.target.value).className
        );
    };

    return (
        <ToggleSet
            title="color theme"
            hideTitle
            options={options.map((item) => item.label)}
            optionsReplacingIcons={options.map((item) => item.icon)}
            selectedOption={currentOption.label}
            onChange={handleThemeToggle}
            sizeFont={size}
            sizeDevider={1.5}
            colorFill="var(--color-button-bg)"
            colorActiveFill="var(--color-text-main)"
            colorActiveText="var(--color-bg)"
            colorDevider="var(--color-bg)"
        />
    );
}

export default ColorThemeSwitcher;
