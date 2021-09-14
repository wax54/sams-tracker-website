import React from 'react';
import AddShift from './shifts/AddShift';
import CurrShiftList from './shifts/CurrShiftList';
const Header = () => {
    return (
        <>
                <CurrShiftList />
                <AddShift />
        </>
    );
};
export default Header