import { useDispatch } from "react-redux";
import { deleteShift } from "../../models/redux/actionCreators";
import ClockOutButton from "../ClockOutButton";

const ShiftRow = ({ shift }) => {
const { start, stop, category, type, id } = shift;
const dispatch = useDispatch();

const remove = () => {
    dispatch(deleteShift(id));
}

return (
    <tr id={`shiftRow-${id}`} >
        <td> {type} </td>
        <td> for {category}</td>
        <td>{shift.getFormattedDuration()}</td>
        <td>{start.getHours() + ' ' + start.getMinutes()}</td>
        {stop ?
            <td>{stop.getHours() + ' ' + stop.getMinutes()}</td>
            : <td><ClockOutButton shiftId={id} /></td>
        }
        <td><button onClick={remove}>X</button></td>
    </tr>
)};
export default ShiftRow