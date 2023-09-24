import CheckboxesSet from "../../components/ui/CheckboxesSet";

function TaskScreenCheckboxes(props) {
    return (
        <CheckboxesSet
            sizeFont="1em"
            sizeItemsGap=".7em"
            color="var(--color-text-main)"
            {...props}
        />
    );
}

export default TaskScreenCheckboxes;
