import { useDispatch } from "react-redux";
import { deleteShift, updateAShift } from "../../models/redux/actionCreators";
import ClockOutButton from "../ClockOutButton";
import MultiTextBox from "../forms/MultiTextBox";
import DateTimeInput from 'react-datetime-picker';
import { useState } from "react";
import { makeColor } from "../../helpers/tools";


const round = (num, decimalPlaces = 0) => {
    const magnitude = (10 ** decimalPlaces)
    return Math.floor(num * magnitude) / magnitude;
}

const ShiftRow = ({ shift }) => {
    const duration = shift.getFormattedDuration();
    const { start, stop, category, type, id } = shift;
    const color = makeColor(shift); 
    const height = round(shift.getHours() * 8 ) + "px";


    const OG_STYLE = {
        minHeight: height,
        position:"relative",
        backgroundColor: color
    };

    const [style, setStyle] = useState(OG_STYLE);
    const [editShift, setEditShift] = useState(false);

    const dispatch = useDispatch();

    const remove = () => {
        dispatch(deleteShift(id));
    };
    const update = (name, newVal) => {
        const updatedShift = {...shift, [name]: newVal};
        dispatch(updateAShift(updatedShift));
    }; 
    const updateType = (name, newVal) => {
        update(name, newVal.toLowerCase())
    };
    const updateCategory = (name, newVal) => {
        update(name, newVal.toLowerCase())
    };

    /** TODO 
     * a little buggy, doesn't update start if you put start after stop and then adjust stop to be later than start
     * im thinking I'm going to have to use state for this, but I'm not sure
     */
    
    const updateStart = (val) => {
        if (val < stop){
            update('start', val);
            setStyle(style => ({ ...style, backgroundColor: color }));
        }
        else {
            setStyle(style => ({ ...style, backgroundColor: 'red' }));
            // alert("Start can't be after stop");
        }
    };
    const updateStop = (val) => {
        if(val > start){
            update('stop', val);
            setStyle(style => ({ ...style, backgroundColor: color }));
        }
        else {
            setStyle(style => ({ ...style, backgroundColor: 'red' }));
            // alert("Start can't be after stop");
        }
    };
    return (
        <div id={`shiftRow-${id}`} className="rounded m-2 p-4" style = {style}>

            <div className=" row justify-content-between rounded p-4 text-light">
                <MultiTextBox 
                    text={type} 
                    className="btn btn-light col-12 mb-3" 
                    value={type} 
                    name="type" 
                    onSubmit={updateType} 
                    />
                
                <div className="col-2 bg-light rounded py-2 mb-3 text-dark">for</div>
                <MultiTextBox 
                    text={category} 
                    className="btn btn-light col-9 mb-3" 
                    value={category} 
                    name="category" 
                    onSubmit={updateCategory} 
                    />

                <button onClick={() => setEditShift(curr => !curr)} className="btn btn-secondary col-12 mb-3">
                    {duration}
                </button>
                { editShift ? 
                <>
                    <DateTimeInput 
                        value={start} 
                        className="btn btn-secondary col-12 col-md-5 p-0"
                        onChange={updateStart} 
                    />
                    {stop ?
                        <DateTimeInput
                            value={stop}
                            className="btn-secondary col-12 col-md-5 p-0"
                            onChange={updateStop}
                        />
                            
                        : <div className="btn-secondary col-12 col-md-5 p-0">
                            <ClockOutButton  shiftId={id} /> 
                        </div>
                    }
                </> : null
                }
            </div>
            <button className="btn btn-danger btn-sm" 
                onClick={remove} 
                style={{ 
                    width: '2rem', 
                    height: '2rem', 
                    position: "absolute", 
                    top: "5px", 
                    right:"5px"}}
            >
                x
            </button>
            <span className="bg-dark text-light p-1 rounded"
                style={{
                    position: "absolute",
                    top: "8px",
                    left: "13px"
                }}
            >
                {start.toLocaleString(undefined, {month: 'short', day: 'numeric', hour:'2-digit', minute:"2-digit"}) }
            </span>
        </div>
)};
export default ShiftRow