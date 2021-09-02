import { shallowEqual, useSelector } from "react-redux";
import { ShiftCollection } from "../../models/ShiftCollection";
import ShiftRow from "./ShiftRow";

const EditShifts = () => {
    //shifts looks like {1: {id, start, stop, type, category, u_id}, ...}
    const shifts = useSelector(({shifts}) => shifts, shallowEqual);
    const allShifts = new ShiftCollection(...Object.values(shifts));

    return (
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Time Spent</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {allShifts.shiftsBy(ShiftCollection.SORT_PARAMS.START)
                    .map(shift => 
                        <ShiftRow shift={shift} key={shift.id} />
                )}
            </tbody>
        </table>
    )
};
export default EditShifts