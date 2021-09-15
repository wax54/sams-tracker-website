import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startShift } from "../../models/actionCreators";
import InputAlert from "../InputAlert";

const AddShift = () => {
    let currShifts = useSelector(({ shifts }) => {
        const currShifts = [];
        for (let key in shifts) {
            if (!shifts[key].stop) currShifts.push(shifts[key]);
        }
        return currShifts;
    });
    
    const INIT = {type: "", category: ""};
    const [ formData, setFormData ] = useState(INIT);
    const [ inputAlerts, setInputAlerts ] = useState({});
    const dispatch = useDispatch();

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({...data, [name]: value}));
    }
    function addAlert(name, msg) {
        setInputAlerts(alerts => ({
            ...alerts,
            [name]: msg
        }));

        setTimeout(() => {
            setInputAlerts(alerts => ({
                ...alerts,
                [name]: undefined
            }));
        }, 3000);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const type = formData.type.toLowerCase().trim();
        const category = formData.category.toLowerCase().trim();
        if(type && category) {
            if (currShifts.some(shift => shift.type===type && shift.category === category)) {
                addAlert('both', `Already clocked in to ${type} for ${category}`); 
                return;
            }
            setFormData(INIT);
            dispatch(startShift(type, category));
        } else {
            if(!type) addAlert('type', 'input must be filled');
            if(!category) addAlert('category', 'input must be filled');
        }
    }

    return (
        <form id="new-shift" className="col-xl border m-3 p-4 rounded shadow " onSubmit={handleSubmit}>
            <div className="row align-items-center justify-content-around">
                <h1 className="col-lg-3 col-xl-12 display-4 text-center">New Shift!</h1>

                <div className="col-12 col-lg-2 col-xl-5 m-2 mb-3">
                    <label htmlFor="type" className="form-label">Work-Type</label>
                    <div className="input-group">
                        <input type="text" 
                            className="form-control" 
                            id="type" 
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            placeholder="Coding" 
                        />
                    </div>
                    {inputAlerts.type ? <InputAlert msg={inputAlerts.type} /> : null}
                </div>
                <div className=" col-lg-3 col-xl-5 m-2 mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">For </span>
                        </div>
                        <input type="text" 
                            className="form-control" 
                            id="category" 
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Fun" />
                    </div>
                    {inputAlerts.category ? <InputAlert msg={inputAlerts.category} /> : null}
                </div>

                <div id="clockin-buttons" className="col m-2 mb-3">
                    {inputAlerts.both ? <InputAlert msg={inputAlerts.both} /> : null}

                    <button type="submit" className="btn btn-secondary col-12 p-3 px-md-5 ">Clock In</button>
                </div>
            </div>
        </form>
    )
};
export default AddShift