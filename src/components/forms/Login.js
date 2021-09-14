import './Login.css';

import React, {useState} from "react";
import {useDispatch} from 'react-redux';
// import { useHistory } from "react-router";
// import UserContext from "../UserContext";
import { authorizeUser} from "../../models/actionCreators";
import SimpleForm from "./SimpleForm";
import { useHistory } from 'react-router';
import { useFormFields } from '../../helpers/hooks';
import { Link } from 'react-router-dom';

const LoginForm = () => {

    const loginInputs = {
        username: "",
        password: ""
    }

    const history = useHistory();
    const dispatch = useDispatch(); 
    const [errors, setErrors] = useState([]);
    const [passwordVisible, toggleVisible] = useState(false);

    const [ { username, password }, handleChange ] = useFormFields(loginInputs);


    const login = async evt => {
        evt.preventDefault();
        const userStatus = await dispatch(authorizeUser({ username, password }));
        if (userStatus.status) {
            history.push('/');
        } else {
            setErrors([userStatus.errors]);
        }
    }

    return (
        <form className="Login container-fluid" onSubmit={login} >
            {errors.map(message =>
                <div key={message} className="alert alert-danger">
                    {message}
                </div>
            )}
            <div className="input-group input-group-lg my-3">

                <label
                    htmlFor="login-password"
                    className="input-group-text">  Username: </label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="login-username"
                    value={username}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group input-group-lg my-3">
                <label 
                    htmlFor="login-password" 
                    className="input-group-text"> 
                    Password: 
                </label>


                <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"

                    name="password"
                    id="login-password"
                    value={password}
                    onChange={handleChange}
                />
                <label className="input-group-text btn btn-secondary" htmlFor="signup-password" style={{}} onClick={() => toggleVisible(curr => !curr)} >
                    {passwordVisible ? "Hide" : "View"}
                </label>
            </div>
            <input className="btn btn-lg btn-block btn-primary" type="submit" value="Login!" />
            <Link className="btn btn-block btn-secondary" to="/signup">Need to Sign Up?</Link>

    </form>
    )};
export default LoginForm