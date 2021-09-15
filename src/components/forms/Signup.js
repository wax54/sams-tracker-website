import './Signup.css';


import { useDispatch} from 'react-redux';
import { registerUser } from "../../models/actionCreators";

import React, { useState } from "react";
import SimpleForm from "./SimpleForm";
import { useHistory } from 'react-router-dom';
import { useFormFields } from '../../helpers/hooks';
import { Link } from 'react-router-dom';

const SignupForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [passwordVisible, toggleVisible] = useState(false);

    
    const signupInputs = {
        username: "",
        password: ""
    }
    const [ {username, password}, handleChange ] = useFormFields(signupInputs);

    const signup = async evt => {
        evt.preventDefault();
        const registered = await dispatch(registerUser({ username, password }));
        if(registered.status) {
            history.push('/');
        } else {
            setErrors([registered.errors]);
        }
    }


    return (
        <form className="Signup container-fluid" onSubmit={signup} >
            {errors.map(message =>
                <div key={message} className="alert alert-danger">
                    {message}
                </div>
            )}
            <div className="input-group input-group-lg my-3">
                <label htmlFor="signup-username"
                    className="input-group-text"
                > Username </label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="signup-username"
                    value={username}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group input-group-lg my-3">
                <label htmlFor="signup-password"
                    className="input-group-text">
                    Password 
                </label>
                <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"

                    name="password"
                    id="signup-password"
                    value={password}
                    onChange={handleChange}
                />
                <label className="input-group-text btn btn-secondary" htmlFor="signup-password" style={{ }} onClick={() => toggleVisible(curr => !curr)} >
                    {passwordVisible ? "Hide" : "View"}
                </label>
            
            </div>
            <input className="btn btn-lg btn-block btn-primary" type="submit" value="Sign Up!"/>
            <Link className="btn btn-block btn-secondary" to="/Login">Already Have An Account?</Link>

        </form>
    )
};
export default SignupForm
