import React, { useEffect, useState } from 'react';
import { clockOutAt, endShift } from './redux/actionCreators';
import { useDispatch } from 'react-redux';
import { Shift, minsFrom } from './ShiftCollection';

const NOW = "NOW";
const FIFTEEN_AGO = "-15";

const CurrShift = ({ shift }) => {

    const dispatch = useDispatch();
    const [duration, setDuration] = useState(shift.getFormattedDuration());
    useEffect(() => {
        const intervalId = setInterval(() => (
            setDuration(shift.getFormattedDuration())
        ), 1000);
        return () => clearInterval(intervalId);
    }, [shift, setDuration]);

    function clockOut(evt) {
        const clockoutDuration = evt.target.dataset.reference;

        if(clockoutDuration === NOW) {
            dispatch(endShift(shift.id));
        } else if (clockoutDuration === FIFTEEN_AGO) {
            const clockOut = minsFrom(-15); //-15 minutes from now
            dispatch(clockOutAt(shift.id, clockOut));
        }else {
            console.error("ERROR ", clockoutDuration);
            dispatch(endShift(shift.id));
        }
    }
    return (
        <li className="row p-3 align-items-start justify-content-center" >
            <div className="col-7 text-center h2">
                <span className="type">{ shift.type } </span> for 
                <span className="category"> { shift.category }</span> 
                <div className="shift-length">
                    { duration }
                </div>
            </div>
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
        </li >
    )
};

export default CurrShift