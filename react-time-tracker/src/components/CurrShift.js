import React, { useEffect, useState } from 'react';
import ClockOutButton from './ClockOutButton';

const CurrShift = ({ shift }) => {

    const [duration, setDuration] = useState(shift.getFormattedDuration());
    useEffect(() => {
        const intervalId = setInterval(() => (
            setDuration(shift.getFormattedDuration())
        ), 1000);
        return () => clearInterval(intervalId);
    }, [shift, setDuration]);

    
    return (
        <li className="row p-3 align-items-start justify-content-center" >
            <div className="col-7 text-center h2">
                <span className="type">{ shift.type } </span> for 
                <span className="category"> { shift.category }</span> 
                <div className="shift-length">
                    { duration }
                </div>
            </div>
            <div className="col-12 col-md-5">
                <ClockOutButton shiftId={shift.id}/>
            </div>
        </li >
    )
};

export default CurrShift