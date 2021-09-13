import React, { useState } from 'react';
const MultiTextBox = ({ 
    text, 
    name, 
    value, 
    onSubmit, 
    className, 
    type="text", 
    style={},
    min=undefined, 
    max=undefined 
}) => {
    const [clicked, setClicked] = useState(false);
    const [val, setVal] = useState(value);
    function handleChange (evt) {
        setVal(evt.target.value);
    } 
    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit(name, val);
        setClicked(false);
    }
    function reset() {
        setVal(value);
        setClicked(false);
    }
    const inputOptions = {};
    if (min) inputOptions.min = min;
    if (max) inputOptions.max = max;

    if(clicked){
        return (
            <form onSubmit={handleSubmit} className={className} style={style}>
                <input 
                    type={type}
                    name={name}
                    value={val}
                    style={{width:"100%"}}
                    onChange={handleChange}
                    {...inputOptions}
                />
                <input className="btn btn-success" type="submit" value="Change"/>
                <button className="btn btn-warning" onClick={reset}>Reset</button>
            </form>
        );
    } else {
        return (
            <span className={className} style={style} onClick={() => setClicked(state => state ? false:true)} >
                {text}
            </span>
        );
    }
};
export default MultiTextBox
