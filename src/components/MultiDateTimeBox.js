import React, { useState } from 'react';
function formatDateTime(dateTime, local = 'en-US', style = { dateStyle: 'short', timeStyle: 'short' }){
    return new Intl.DateTimeFormat(local, style).format(dateTime);
}
//datetime => "2018-06-12T19:30"
function formatForInput(d) {
    let str = d.toISOString();
    //remove seconds and tz for input
    return str.slice(0,-8);
}
const MultiDateTimeBox = ({ value, text, onChange}) => {
    const [clicked, setClicked] = useState(false);
    const [val, setVal] = useState(date);
    const text = formatDateTime(date);
    let minAndMax = {};
    if (min)
        minAndMax.min =  formatForInput(min);
    if (max)
        minAndMax.max = formatForInput(max);

    function handleChange (evt) {
        setVal(new Date(evt.target.value));
    } 
    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit(name, val);
        setClicked(false);
    }


    if(clicked){
        return (
            <DateTimeInput
                value={value}
                className="btn-secondary col-12 col-md-5 p-0"
                onChange={onChange}
            />
        );
    } else {
        return (
            <span onClick={() => setClicked(state => state ? false:true)} >
                {text}
            </span>
        );
    }
};
export default MultiDateTimeBox
