import { shallowEqual, useSelector } from "react-redux";
import { ShiftCollection } from "../../models/ShiftCollection";
import ClockOutButton from "../ClockOutButton";

const EditShifts = () => {
    //shifts looks like {1: {id, start, stop, type, category, u_id}, ...}
    const shifts = useSelector(({shifts}) => shifts, shallowEqual);
    const allShifts = new ShiftCollection(...Object.values(shifts));

    return (
        <table>
            <thead>
                <th>Type</th>
                <th>Category</th>
                <th>Time Spent</th>
                <th>Start</th>
                <th>End</th>
                <th>Delete</th>
            </thead>
            <tbody>
                {allShifts.shiftsBy(ShiftCollection.SORT_PARAMS.START)
                    .map(shift => {
                        const { start, stop, type, category, id } = shift;
                        return (
                        <tr key={id} >
                            <td>{type} </td>
                            <td> for {category}</td>
                            <td> {shift.getFormattedDuration()}</td>
                            <td>{start.getHours() + ' ' + start.getMinutes()}</td>
                            { stop ? 
                                <td>{stop.getHours() +' ' +stop.getMinutes()}</td>
                            :   <td><ClockOutButton shiftId={id}/></td>
                            }
                            <td>X</td>
                        </tr>
                        )})}
            </tbody>
        </table>
    )
};
export default EditShifts