import './Login.css';

import React, {useState} from "react";
import {useDispatch} from 'react-redux';
// import { useHistory } from "react-router";
// import UserContext from "../UserContext";
import { authorizeUser} from "../redux/actionCreators";
import SimpleForm from "./SimpleForm";

const LoginForm = () => {
    const dispatch = useDispatch(); 
    const [errors, setErrors] = useState([]);

    const loginInputs = {
        username: "",
        password: ""
    }

    const login = async ({ username, password }, reset) => {
        const result = await dispatch(authorizeUser({ username, password }));
        if (result.status) {
            reset();
            alert(`logged In ${result.user.id}`);
        } else {
            setErrors([result.errors]);
        }
    }

    return <SimpleForm 
        className="Login" 
        INITIAL_STATE={loginInputs} 
        onSubmit={login}
        submitText="Login"
        errors={errors}
    />
};
export default LoginForm