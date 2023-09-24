import RangeBlock from "../../components/ui/RangeBlock";
import { config } from "../../config/config";

function TaskScreenRange(props) {
    return (
        <RangeBlock
            min={config.quistionsAmount.min}
            max={config.quistionsAmount.max}
            trackColor="var(--color-range-track)"
            thumbColor="var(--color-range-thumb)"
            sizeFont="1.2em"
            sizeGap=".5em"
            {...props}
        ></RangeBlock>
    );
}

export default TaskScreenRange;
