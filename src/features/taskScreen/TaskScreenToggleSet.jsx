import ToggleSet from "../../components/ui/ToggleSet";

function TaskScreenToggleSet(props) {
    return (
        <ToggleSet
            sizeFont="1em"
            sizeFontTitle="1.3em"
            sizeTitleIndent={10}
            sizeDevider={1.5}
            colorFill="var(--color-button-bg)"
            colorActiveFill="var(--color-text-main)"
            colorActiveText="var(--color-bg)"
            colorDevider="var(--color-bg)"
            {...props}
        />
    );
}

export default TaskScreenToggleSet;
