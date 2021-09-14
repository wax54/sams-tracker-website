import React, {useState} from 'react';
import NewGoal from '../goals/NewGoal';
import { useDispatch, useSelector } from 'react-redux';
import GoalList from '../goals/GoalList';
import { timeFrames } from '../../helpers/config';
import { setTimeFrame } from '../../models/redux/actionCreators';

const SetGoals = () => {
    const timeFrameKey = useSelector(({timeFrame}) => timeFrame);
    const dispatch = useDispatch();
    const handleTimeFrameChange = evt => dispatch(setTimeFrame(evt.target.value));

    return (
        <div className="container-fluid p-2 align-items-center justify-content-around">
            <div className="row border m-3 p-4 rounded shadow justify-content-center">
                <h1><select 
                        name='timeFrame' 
                        onChange={handleTimeFrameChange}
                        value={timeFrameKey}
                    >
                    { Object.keys(timeFrames).map(key =>
                        <option key={key} value={key}>{timeFrames[key].title}</option>
                    )}
                    {/* <option value="day">{timeFrames.day.title}</option>
                    <option value="week">{timeFrames.week.title}</option>
                    <option value="month">{timeFrames.month.title}</option> */}
                    </select> I want to spend...
                </h1>
                <GoalList timeFrame={timeFrames[timeFrameKey]} />
                <h4>And...</h4>
                <NewGoal timeFrame={timeFrames[timeFrameKey]} />
            </div>
        </div>
    )
};
export default SetGoals