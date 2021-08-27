import './Signup.css';

import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import SimpleForm from "./SimpleForm";

const SignupForm  = () => {
    const [ errors, setErrors ] = useState([]);
    const history = useHistory();
    
    const { registerUser } = useContext(UserContext);
    const signupInputs = {
        username : "",
        password : "", 
        firstName : "", 
        lastName : "", 
        email : ""
    }

    const signup = async userData => {

        
        const res = await registerUser(userData);

        if (res.status) {
            history.push('/');
        } else {
            setErrors(res.errors);
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