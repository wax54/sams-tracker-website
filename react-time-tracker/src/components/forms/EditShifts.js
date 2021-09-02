import { shallowEqual, useSelector } from "react-redux";
import { ShiftCollection } from "../../models/ShiftCollection";

const EditShifts = () => {
    //shifts looks like {1: {id, start, stop, type, category, u_id}, ...}
    const shifts = useSelector(({shifts}) => shifts, shallowEqual);
    console.log(Object.values(shifts));
    const allShifts = new ShiftCollection(Object.values(shifts));
    return (
        <table>
            <thead>
                <th>Type</th>
                <th>Category</th>
                <th>Start</th>
                <th>End</th>
                <th>Delete</th>
            </thead>
            <tbody>
                {allShifts.shiftsBy(ShiftCollection.SORT_PARAMS.START).map(({start, stop, type, category, id}) => (
                    <tr key={id} >
                        <td>{type}</td>
                        <td>{category}</td>
                        <td>{start}</td>
                        <td>{stop}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};
export default EditShifts