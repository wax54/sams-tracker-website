import './Login.css';

import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import UserContext from "../UserContext";
import SimpleForm from "./SimpleForm";

const LoginForm = () => {
    const { loginUser } = useContext(UserContext);
    const [ errors, setErrors] = useState([]);

    const history = useHistory();

    const loginInputs = {
        username: "",
        password: ""
    }

    const login = async ({ username, password }) => {
        const res = await loginUser({ username, password });
        if (res.status) {
            history.push('/');
        } else {
            setErrors(res.errors);
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