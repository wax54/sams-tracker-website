import { useDispatch, useSelector } from "react-redux";
import { deleteGoal, updateAGoal } from "../../models/actionCreators";
import { DOING_ANYTHING_KEY, timeFrames } from "../../config";
import MultiTextBox from "../MultiTextBox";
import { round } from "../../helpers/tools";
const GoalRow = ({ goal }) => {
    let { type, category, seconds_per_day } = goal;
    const timeFrame = useSelector(({timeFrame}) => timeFrames[timeFrame]);

    const hours = round((seconds_per_day / 60 / 60) * timeFrame.val, timeFrame.roundPlaces);
        //secs per day 60 seconds in a min, 60 mins in a hour  gets you hours per day
        // * days in timeframe (val)

    const dispatch = useDispatch();

    const remove = () => {
        dispatch(deleteGoal(goal));
    };
    const changeGoal = (name, hours) => {
        const seconds_per_day = round((hours / timeFrame.val) * 60 * 60);
            //30 hours per week (divided by 7) * 60 mins in hour * 60 secs in min 
        dispatch(updateAGoal({ ...goal , seconds_per_day }));
    }

    type = (type === DOING_ANYTHING_KEY) ? "Doing Anything" : type;
    const text = 
        <>
            <MultiTextBox
                type="number"
                text={hours + ' ' + (hours === 1 ? "hour" : "hours")}
                className="btn btn-light col-12 col-lg-3"
                value={hours}
                name="hours"
                min={0}
                onSubmit={changeGoal}
                step={1 / (10 ** timeFrame.roundPlaces)}

            />
            <span className="col-10 col-lg-7">
                { type } for { category }
            </span>
        </>;
    return (
        <div className="row mb-3" >
            {text}
            <button className="btn btn-danger col-2"
                onClick={remove}
            >x</button>
        </div>
)};
export default GoalRow