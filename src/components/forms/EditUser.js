import './Login.css';

import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import UserContext from "../UserContext";
import SimpleForm from "./SimpleForm";

import "./EditUser.css";

const EditUserForm = () => {
    const { user, updateUser } = useContext(UserContext);
    const [ errors, setErrors] = useState([]);

    const history = useHistory();

    const updateUserInputs = {
        passwordVerification: ''

    }

    const update = async (formData) => {
        const res = await updateUser(formData);
        if (res.status) {
            history.push('/');
        } else {
            setErrors(res.errors);
        }
    }

    return <SimpleForm 
        className="update-info" 
        INITIAL_STATE={updateUserInputs} 
        onSubmit={update}
        submitText="Update"
        errors={errors}
    />
};
export default EditUserForm