import { useDispatch } from "react-redux";
import { deleteGoal } from "../../models/redux/actionCreators";
import { DOING_ANYTHING_KEY } from "../../config";

const GoalRow = ({ goal, timeFrame }) => {
    const dispatch = useDispatch();
    const remove = () => {
        dispatch(deleteGoal(goal));
    };
    let {type, category, seconds_per_day} = goal;
    type = (type === DOING_ANYTHING_KEY) ? "Doing Anything" : type;
    const hours = Math.ceil((seconds_per_day / 60 / 60) * timeFrame.val);

    const text = <>{ hours } {hours === 1 ? "hour" : "hours"} { type } for { category }</>
    return (
        <h4>
            {text}
            <span className="btn btn-danger btn-sm" onClick={remove}>
                x
            </span>
        </h4>
)};
export default GoalRow