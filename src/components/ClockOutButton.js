import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { minsFrom } from '../models/ShiftCollection';
import { clockOutAt, deleteShift, endShift } from '../models/redux/actionCreators';
const NOW = "NOW";
const FIFTEEN_AGO = "-15";

const ClockOutButton = ({ shiftId }) => {
    const dispatch = useDispatch();
    const minsAgo = useSelector(({ shifts }) =>  (new Date() - new Date(shifts[shiftId].start)) / 1000 / 60); // 6000000ms / 1000 ms/s / 60 s/m = 100 minsAgo
    function remove() {
        dispatch(deleteShift(shiftId));
    }
    function clockOut(evt) {
        const clockoutDuration = evt.target.dataset.reference;

        if (clockoutDuration === NOW) {
            dispatch(endShift(shiftId));
        } else if (clockoutDuration === FIFTEEN_AGO) {
            const clockOut = minsFrom(0); //-15 minutes from now
            dispatch(clockOutAt(shiftId, clockOut));
        } else {
            console.error("ERROR ", clockoutDuration);
            dispatch(endShift(shiftId));
        }
    }
    return (
        <>
            <div className="dropdown clockout row align-items-start justify-content-center shadow border rounded">
                <button className="btn btn-primary col-10 text-center" 
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    data-reference={NOW} onClick={clockOut}
                >
                    Clock Out
                </button>
                <button className="btn btn-primary col-2 dropdown-toggle text-center" 
                    style={{ 
                        borderTopLeftRadius: 0, 
                        borderBottomLeftRadius: 0
                    }} 
                    data-bs-toggle="dropdown" 
                />
                
                <div className="dropdown-menu bg-primary clock-out p-0 shadow"
                    style={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0
                    }} >
                    {minsAgo > 2 ? 
                        <button className="btn btn-block m-0 btn-primary text-light" data-reference={FIFTEEN_AGO} onClick={clockOut}>
                            15 MINUTES AGO
                        </button>
                        : null
                    }  

                    <button className="btn btn-block btn-danger text-light m-0" onClick={remove}>
                        CANCEL SHIFT
                    </button>
                </div>
            </div>
        </>
)};
export default ClockOutButton