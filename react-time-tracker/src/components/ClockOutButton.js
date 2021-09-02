import React from "react";
import { useDispatch } from 'react-redux';
import { minsFrom } from '../models/ShiftCollection';
import { clockOutAt, endShift } from '../models/redux/actionCreators';
const NOW = "NOW";
const FIFTEEN_AGO = "-15";

const ClockOutButton = ({ shiftId }) => {
    const dispatch = useDispatch();
    
    function clockOut(evt) {
        const clockoutDuration = evt.target.dataset.reference;

        if (clockoutDuration === NOW) {
            dispatch(endShift(shiftId));
        } else if (clockoutDuration === FIFTEEN_AGO) {
            const clockOut = minsFrom(-15); //-15 minutes from now
            dispatch(clockOutAt(shiftId, clockOut));
        } else {
            console.error("ERROR ", clockoutDuration);
            dispatch(endShift(shiftId));
        }
    }
    return (
    <div className="col-4 dropdown clockout">
        <button className="btn btn-secondary dropdown-toggle text-center" data-bs-toggle="dropdown">
            Clock Out
        </button>
        <div className="dropdown-menu clock-out">
            <button className="btn" data-reference={NOW} onClick={clockOut}>
                Now
            </button>
            <button className="btn" data-reference={FIFTEEN_AGO} onClick={clockOut}>15 Mins Ago</button>
        </div>
    </div>
)};
export default ClockOutButton