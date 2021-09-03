import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { ShiftCollection } from "../../models/ShiftCollection";


const DOING_ANYTHING_KEY = "doing anything in the whole world";
const NEW_THING_KEY = "a whole new thing";

const NewGoal = ({ timeFrame }) => {
    const [newestGoal, setNewestGoal] = useState(5);
    const shifts = useSelector(({ shifts }) => shifts, shallowEqual);
    const allShifts = new ShiftCollection(...Object.values(shifts));

    return (
        <form>
            <input type="range"
                id="hours" name="hours"
                min={0}
                max={50}
                value={newestGoal}
                onChange={evt => setNewestGoal(evt.target.value)}
            />
            <label htmlFor="hours">{newestGoal} Hours {timeFrame} </label>
            <select id="type" name="type" >
                <option value={DOING_ANYTHING_KEY}>Doing Anything</option>
                {allShifts.getTypes().map( type => 
                    <option key={type} value={type}>{type}</option>
                )}
                <option value={NEW_THING_KEY}>
                    Doing Something Else
                </option>

            </select>
            For
            <select id = "category" name = "category" >
                {allShifts.getCategories().map(category =>
                    <option key={category} value={category}>{category}</option>)
                }
            </select >

        </form >
    );
};
export default NewGoal