import { useDispatch } from "react-redux";
import { deleteGoal, updateAGoal } from "../../models/redux/actionCreators";
import { DOING_ANYTHING_KEY } from "../../config";
import { useFormFields } from "../../helpers/hooks";

const GoalRow = ({ goal, timeFrame }) => {
    let { type, category, seconds_per_day } = goal;
    const hours = Math.ceil((seconds_per_day / 60 / 60) * timeFrame.val); 
        //secs per day 60 seconds in a min, 60 mins in a hour  gets you hours per day
        // * days in timeframe (val)
    const [data, handleChange] = useFormFields({ hours });
    const dispatch = useDispatch();

    const remove = () => {
        dispatch(deleteGoal(goal));
    };
    const changeGoal = (evt) => {
        const newHours = evt.target.value;
        const seconds_per_day = Math.floor((newHours / timeFrame.val) * 60 * 60);
            //30 hours per week (divided by 7) / 60 mins in hour / 60 secs in min 
        dispatch(updateAGoal({ ...goal , seconds_per_day }));
        handleChange(evt);
    }

    type = (type === DOING_ANYTHING_KEY) ? "Doing Anything" : type;

    const text = 
        <>
            <input 
                type="number" 
                name="hours" 
                value={data.hours} 
                onChange={changeGoal} 
                style={{width: '4rem'}}
            />
            {hours === 1 ? "hour" : "hours"} { type } for { category }
        </>;
    return (
        <h4>
            {text}
            <span className="btn btn-danger btn-sm" onClick={remove}>
                x
            </span>
        </h4>
)};
export default GoalRow