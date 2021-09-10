import './Signup.css';

import { useDispatch} from 'react-redux';
import { registerUser } from "../../models/redux/actionCreators";

import React, { useState } from "react";
import SimpleForm from "./SimpleForm";
import { useHistory } from 'react-router';

const SignupForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    
    const signupInputs = {
        username: "",
        password: ""
    }

    const signup = async ({ username, password }, reset) => {
        const result = await dispatch(registerUser({ username, password }));
        if(result.status) {
            //caused a memory leak because the login form was usually gone by the time it updated
            //reset();
            // setErrors([]);
            alert(`Registered ${result.user.id}`);
            history.push('/');
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