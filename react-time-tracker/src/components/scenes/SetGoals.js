import React, {useState} from 'react';
import NewGoal, {DOING_ANYTHING_KEY} from '../forms/NewGoal';
import { useSelector, shallowEqual } from 'react-redux';
const timeFrames = { 
    day:{
        title: "Every Day", 
        val:1
    },
    week: {
        title: "Every Week",
        val: 7,
    },
    month: {
        title: "Every Month",
        val: 30
    }
}
const SetGoals = () => {
    const [ timeFrame, setTimeFrame ] = useState("week");

    const goals = useSelector(({ goals }) => goals, shallowEqual);

    return (
        <div className="container-fluid p-2 align-items-center justify-content-around">
            <div className="row border m-3 p-4 rounded shadow justify-content-center">
                <h1><select 
                        name='timeframe' 
                        onChange={evt => setTimeFrame(evt.target.value)}
                        value={timeFrame}
                    >
                    <option value="day">{timeFrames.day.title}</option>
                    <option value="week">{timeFrames.week.title}</option>
                    <option value="month">{timeFrames.month.title}</option>
                    </select> I want to spend...
                </h1>
                {goals.map(({seconds_per_day, category, type}) => {
                    const hours = Math.ceil((seconds_per_day/60/60)*timeFrames[timeFrame].val);
                    type = (type === DOING_ANYTHING_KEY)? "Doing Anything" : type;
                    return (
                    <h4 key={`${category}-${type}`}> 
                        
                        {hours} {hours === 1 ? "hour":"hours"} {type} for {category}</h4>
                    )}
                )}
                <h4>And...</h4>
                <NewGoal timeFrame={timeFrames[timeFrame]} />
            </div>
        </div>
    )
};

export default SetGoals