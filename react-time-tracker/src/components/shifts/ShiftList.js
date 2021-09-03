import { shallowEqual, useSelector } from "react-redux";
import { ShiftCollection } from "../../models/ShiftCollection";
import ShiftRow from "./ShiftRow";

const ShiftList = () => {
    //shifts looks like {1: {id, start, stop, type, category, u_id}, ...}
    const shifts = useSelector(({shifts}) => shifts, shallowEqual);
    const allShifts = new ShiftCollection(...Object.values(shifts));
    const sort = ShiftCollection.SORT_PARAMS;
    return (
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th></th>
                    <th>Category</th>
                    <th>Start</th>
                    <th>Time Spent</th>
                    <th>End</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {allShifts.shiftsBy(sort.STOP, sort.DESCENDING)
                    .map(shift => 
                        <ShiftRow shift={shift} key={shift.id} />
                )}
            </tbody>
        </table>
    )
};
export default ShiftList