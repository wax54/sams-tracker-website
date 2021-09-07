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
            console.log(clockOut);
            dispatch(clockOutAt(shiftId, clockOut));
        } else {
            console.error("ERROR ", clockoutDuration);
            dispatch(endShift(shiftId));
        }
    }
    return (
        <>
            <div className="dropdown clockout row align-items-start justify-content-center">
                <button className="btn btn-secondary col-10 text-center" 
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    data-reference={NOW} onClick={clockOut}
                >
                    Clock Out
                </button>
                <button className="btn btn-secondary col-2 dropdown-toggle text-center" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} data-bs-toggle="dropdown" />
                
                <div className="dropdown-menu clock-out">
                    <button className="btn btn-block" data-reference={FIFTEEN_AGO} onClick={clockOut}>
                        15 Mins Ago
                    </button>
                </div>
            </div>
        </>
)};
export default ClockOutButton