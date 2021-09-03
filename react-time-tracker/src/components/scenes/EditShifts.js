import React from 'react';
import ShiftList from '../shifts/ShiftList';
const EditShifts = () => {
    return (
        <div className="container-fluid p-2 align-items-center justify-content-around">
            <div className="row border m-3 p-4 rounded shadow justify-content-center">
                <ShiftList />
            </div>
        </div>
    )
};

export default EditShifts