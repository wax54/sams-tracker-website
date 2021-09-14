import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useFormFields } from "../../helpers/hooks";
import { addGoal } from "../../models/actionCreators";
import { ShiftCollection } from "../../models/ShiftCollection";
import { DOING_ANYTHING_KEY, NEW_THING_KEY } from "../../config";
import { timeFrames } from "../../helpers/config";


const NewGoal = () => {
    const dispatch = useDispatch();
    // const [newestGoal, setNewestGoal] = useState(5);
    const shifts = useSelector(({ shifts }) => shifts, shallowEqual);
    const goals = useSelector(({ goals }) => goals, shallowEqual);
    const timeFrame = useSelector(({timeFrame}) => timeFrames[timeFrame], shallowEqual);

    const allShifts = new ShiftCollection(...Object.values(shifts));

    /** TODO Fix up this initial state to account for when there are no shifts */
    const [data, handleChange, resetForm] = useFormFields({
        hours: '5',
        type: DOING_ANYTHING_KEY,
        category: allShifts.getCategories()[0],
        newType: "",
    });

    const handleSubmit = async evt => {
        evt.preventDefault();
        let { category, type, hours, newType } = data;
        type = type === NEW_THING_KEY ? newType : type;
        if(goals[category] && goals[category][type]) {
            alert(` You already set a goal to spend time ${type} for ${category}. Try editing that goal instead`);
            return;
        }

        hours = +hours;
        const seconds = 60 * 60 * hours;//60 seconds in min * 60 mins in hour 
        const seconds_per_day = Math.floor(seconds / timeFrame.val); // if day, val is 1, if week val is 7
        const newGoal = {
            type,
            category,
            seconds_per_day
        }

        dispatch(addGoal(newGoal));
        //TODO dispatch new Goal Event
        resetForm();
    }

    return (
        
        <form onSubmit={handleSubmit} className="row">
            <div className="col-12 col-lg-6">
                <div className="input-group">
                    <input 
                        type="number"
                        className="form-control"
                        id="hours" 
                        name="hours"
                        min={0}
                        value={data.hours}
                        onChange={handleChange}
                        step={1 / (10 ** timeFrame.roundPlaces)}
                    />
                    <label htmlFor="hours" className="input-group-text"> Hours {timeFrame.title} </label> 
                </div>
            </div>
            <div className="col-12 col-lg-6">
                <div className="input-group">
                    {data.type !== NEW_THING_KEY  ? 
                        <select id="type" name="type" value={data.type}
                            className="form-control"
                            onChange={handleChange}>
                            <option value={DOING_ANYTHING_KEY}>
                                Doing Anything
                            </option>
                            {allShifts.getTypes().map( type => 
                                <option key={type} value={type}>{type}</option>
                            )}
                            <option value={NEW_THING_KEY}>
                                Something Else
                            </option>
                        </select> 
                        :
                        <input type="text"
                            className="form-control" 
                            id="newType"
                            name="newType"
                            placeholder="Type Your New Shift Type Here"
                            value={data.newType}
                            onChange={handleChange} 
                        />
                        }
                    <div className="input-group-text">For</div>
                    <select id = "category" name = "category" className="form-control" value={data.category} onChange={handleChange}>
                        {allShifts.getCategories().map(category =>
                            <option key={category} value={category}>
                                {category}
                            </option>)
                        }
                    </select >
                    <button className="btn btn-success" >Add Goal</button>
                </div>
            </div>
        </form >
    );
};
export default NewGoal