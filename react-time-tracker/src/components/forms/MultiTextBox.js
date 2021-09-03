import React, { useState } from 'react';
const MultiTextBox = ({ text, name, value, onSubmit }) => {
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

    if(clicked){
        return (
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name={name}
                    value={val}
                    onChange={handleChange}
                />
                <button className="btn btn-warning" onClick={reset}>Reset</button>
                <input className="btn btn-success" type="submit" value="Change"/>
            </form>
        );
    } else {
        return (
            <span onClick={() => setClicked(state => state ? false:true)} >
                {text}
            </span>
        );
    }
};
export default MultiTextBox
