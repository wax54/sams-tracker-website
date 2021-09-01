import React, { useState } from "react";

import './SimpleForm.css'

const SimpleForm = ( {className, INITIAL_STATE, onSubmit, submitText="Submit", errors=[]} ) => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const handleChange = evt => setFormData(data => {
        return {...data, [evt.target.name] : evt.target.value}
    });
    const resetForm = () => setFormData(INITIAL_STATE);
    const handleSubmit = evt => {
        evt.preventDefault(); 
        onSubmit(formData, resetForm);
    };
    return (
        <form className={className} onSubmit={handleSubmit}>
            {errors.map(message => 
                <div key={message} className={`${className}-error form-error`}>
                    {message}
                </div> 
            )}
            {Object.keys(INITIAL_STATE).map(name => (
                <div key={name}>
                    <label htmlFor={name}> {name}: </label>
                    <input
                        type="text"
                        name={name}
                        id={name}
                        value={formData[name]}
                        onChange={handleChange} 
                    />
                </div>
            ))}
            <button>{submitText}</button>
        </form> 
    )
};
export default SimpleForm