import React from "react";
const InputAlert = ({ msg, persistence = 0 }) => {

    const alertId = Math.random() + '-alert';

    if(+persistence > 0){
        setTimeout(() => {
            document.getElementById(alertId).remove();
        }, +persistence);
    }

    return (
    <div className="alert bg-warning" id={alertId}>
        { msg }
    </div>
)};
export default InputAlert
