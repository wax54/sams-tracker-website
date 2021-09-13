import React from 'react';
import AddShift from './AddShift';
import CurrShiftList from './CurrShiftList';
const Header = () => {
    return (
        <>
                <CurrShiftList />
                <AddShift />
        </>
    );
};
export default Header