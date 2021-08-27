import './Signup.css';

import { useDispatch} from 'react-redux';
import { registerUser } from "../redux/actionCreators";

import React, { useState } from "react";
import SimpleForm from "./SimpleForm";

const SignupForm = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    
    const signupInputs = {
        username: "",
        password: ""
    }

    const signup = async ({ username, password }, reset) => {
        const result = await dispatch(registerUser({ username, password }));
        if(result.status) {
            reset();
            alert(`Registered ${result.user.id}`);
        } else {
            setErrors([result.errors]);
        }
        
    }


    return <SimpleForm 
        className="Signup"
        INITIAL_STATE={signupInputs}
        onSubmit={signup}
        submitText="Sign Up!"
        errors={errors}
    />
};
export default SignupForm