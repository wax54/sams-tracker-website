import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { ShiftCollection } from "../../models/ShiftCollection";
import ShiftRow from "./ShiftRow";

const ShiftList = () => {
    //shifts looks like {1: {id, start, stop, type, category, u_id}, ...}
    const shifts = useSelector(({shifts}) => shifts, shallowEqual);
    const allShifts = new ShiftCollection(...Object.values(shifts));
    const sort = ShiftCollection.SORT_PARAMS;
    const [sortType, setSortType] = useState(sort.START);
    const [sortDirection, setSortDirection] = useState(sort.DESCENDING);

    return (
        <>  
            <div className="input-group">
                <label htmlFor="sortComboBox" className="input-group-text" >Sort By</label>
                <select 
                    className="form-control"
                    id="sortComboBox" 
                    value={sortType} 
                    onChange={evt => setSortType(evt.target.value)}
                > 
                    <option value={sort.START}> Start </option>
                    <option value={sort.STOP}> Stop </option>
                    <option value={sort.CATEGORY}> Category </option>
                    <option value={sort.TYPE}> Type </option>
                </select>
                <button className="input-group-text btn" onClick={() => setSortDirection(sortDirection === sort.DESCENDING ? sort.ASCENDING : sort.DESCENDING)}>
                    {sortDirection === sort.DESCENDING ? "Descending" : "Ascending"}
                </button>
            </div>

            


            {allShifts.shiftsBy(sortType, sortDirection)
                .map(shift => 
                    <ShiftRow shift={shift} key={shift.id} />
            )}
        </>
    )
};
export default ShiftList