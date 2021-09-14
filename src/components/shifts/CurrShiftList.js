import React from 'react';
import { useSelector } from 'react-redux';
import CurrShift from './CurrShift';
import { Shift } from '../../models/ShiftCollection';

const CurrShiftList = () => {
    let currShifts = useSelector(({ shifts }) => {
        const currShifts = [];
        for(let key in shifts){
            if(!shifts[key].stop) currShifts.push(shifts[key]);
        }
        return currShifts;
    });
    if(currShifts.length === 0) return null;
    currShifts = currShifts.map(shift => new Shift(shift));
    return (
        <div className="col-xl m-3 p-4 rounded shadow border">
            <div className="row align-items-center justify-content-around">
                <h1 className="display-4 text-center col-12 col-md-3 col-xl-12">Current Shifts</h1>

                <ul id="current-shifts" className="col-12 col-md-9 col-xl-12">
                    {currShifts.map(shift => 
                        <CurrShift key={shift.id} shift={shift} />
                    )}
                </ul>
            </div>
        </div>
     )
}

export default CurrShiftList