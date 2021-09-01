import React from 'react';
import AddShift from './AddShift';
import CurrShiftList from './CurrShiftList';
const Header = () => {
    
    return (
        <div className="container-fluid p-2 align-items-center justify-content-around">
            <div className="row border m-3 p-4 rounded shadow justify-content-center">
                <AddShift />
                <CurrShiftList />
                
            </div>
        </div>
    )
};
export default Header