import React, {useState} from 'react';
import NewGoal from '../forms/NewGoal';
import { useSelector, shallowEqual } from 'react-redux';
import GoalList from '../goals/GoalList';

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

    const goals = useSelector(({ goals }) => goals);

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
                <GoalList goals={goals} timeFrame={timeFrames[timeFrame]} />
                <h4>And...</h4>
                <NewGoal timeFrame={timeFrames[timeFrame]} />
            </div>
        </div>
    )
};
export default SetGoals