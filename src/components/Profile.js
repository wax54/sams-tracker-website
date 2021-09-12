import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetUser } from '../models/redux/actionCreators';
const Profile = () => {
    const user = useSelector(({ user }) => user, shallowEqual);
    const dispatch = useDispatch();
    const logoutUser = () => {
        dispatch(resetUser());
    }
    return (
        <div>
            <h1>Welcome to your profile, {user.username}!</h1> 
            <ul>
                {Object.keys(user).map(key => 
                    <li>{key}: {user[key]}</li>
                )}
            </ul>
            <Link onClick={logoutUser} to="/logout" className="nav-item nav-link mx-3 btn-danger text-light rounded">Logout</Link>

        </div>
    );
};
export default Profile