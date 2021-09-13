import { useDispatch } from "react-redux";
import { deleteGoal, updateAGoal } from "../../models/redux/actionCreators";
import { DOING_ANYTHING_KEY } from "../../config";
import MultiTextBox from "../forms/MultiTextBox";

const GoalRow = ({ goal, timeFrame }) => {
    let { type, category, seconds_per_day } = goal;
    const hours = Math.round((seconds_per_day / 60 / 60) * timeFrame.val); 
        //secs per day 60 seconds in a min, 60 mins in a hour  gets you hours per day
        // * days in timeframe (val)
    const dispatch = useDispatch();

    const remove = () => {
        dispatch(deleteGoal(goal));
    };
    const changeGoal = (name, hours) => {
        const seconds_per_day = Math.round((hours / timeFrame.val) * 60 * 60);
            //30 hours per week (divided by 7) / 60 mins in hour / 60 secs in min 
        dispatch(updateAGoal({ ...goal , seconds_per_day }));
    }

    type = (type === DOING_ANYTHING_KEY) ? "Doing Anything" : type;

    const text = 
        <>
            <MultiTextBox
                type="number"
                text={hours + (hours === 1 ? "hour" : "hours")}
                className="btn btn-light mb-3 col-2"
                value={hours}
                name="hours"
                min={0}
                onSubmit={changeGoal}
            />
            <span className="col-10">
                { type } for { category }
            </span>
        </>;
    return (
        <div className="row" style={ {position:'relative'}} >
            {text}
            <button className="btn btn-danger btn-sm"
                onClick={remove}
                style={{
                    width: '2rem',
                    height: '2rem',
                    position: "absolute",
                    top: "5px",
                    right: "5px"
                }}
            >
                x
            </button>
        </div>
)};
export default GoalRow