import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetUser } from './models/actionCreators';
const Profile = () => {
    const user = useSelector(({ user }) => user, shallowEqual);
    const dispatch = useDispatch();
    const logoutUser = () => {
        dispatch(resetUser());
    }
    return (
        <div>
            <h1>Welcome to your profile, {user.username}!</h1> 
            <p> There's not much Here, but it's here</p>
            <Link onClick={logoutUser} to="/logout" className="nav-item nav-link mx-3 btn-danger text-light rounded">Logout</Link>

        </div>
    );
};
export default Profile