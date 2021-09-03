import { useDispatch } from "react-redux";
import { deleteShift, updateAShift } from "../../models/redux/actionCreators";
import ClockOutButton from "../ClockOutButton";
import MultiTextBox from "../forms/MultiTextBox";
import DateTimeInput from 'react-datetime-picker';
import { useState } from "react";

const ShiftRow = ({ shift }) => {
    const [style, setStyle] = useState({});
    const { start, stop, category, type, id } = shift;
    const dispatch = useDispatch();

    const remove = () => {
        dispatch(deleteShift(id));
    };
    const update = (name, newVal) => {
        const updatedShift = {...shift, [name]: newVal};
        dispatch(updateAShift(updatedShift));
    };

    /** TODO 
     * a little buggy, doesn't update start if you put start after stop and then adjust stop to be later than start
     * im thinking I'm going to have to use state for this, but I'm not sure
     */
    const updateStart = (val) => {
        if (val < stop){
            update('start', val);
            setStyle({});
        }
        else {
            setStyle({backgroundColor: 'red'})
            // alert("Start can't be after stop");
        }
    };
    const updateStop = (val) => {
        if(val > start){
            update('stop', val);
            setStyle({});
        }
        else {
            setStyle({ backgroundColor: 'red' });
            // alert("Start can't be after stop");
        }
    };
    return (
        <tr id={`shiftRow-${id}`} style ={style}>
            <td><MultiTextBox text={type} value={type} name="type" onSubmit={update} /> </td>
            <td><small>for</small></td>
            <td><MultiTextBox text={category} value={category} name="category" onSubmit={update} /> </td>
            <td><DateTimeInput 
                value={start} 
                onChange={updateStart} 
            />
            </td>
            <td>- {shift.getFormattedDuration()} -</td>
            <td>
            {stop ?
                <DateTimeInput
                    value={stop}
                    onChange={updateStop}
                />
                : <ClockOutButton shiftId={id} />
            }
            </td>
            <td className="btn btn-danger btn-sm" onClick={remove}>
                x
            </td>
        </tr>
)};
export default ShiftRow