import RangeBlock from "../../components/ui/RangeBlock";

function TaskScreenRange(props) {
    return (
        <RangeBlock
            min="10"
            max="30"
            trackColor="var(--color-range-track)"
            thumbColor="var(--color-range-thumb)"
            sizeFont="1.2em"
            sizeGap=".5em"
            {...props}
        ></RangeBlock>
    );
}

export default TaskScreenRange;
