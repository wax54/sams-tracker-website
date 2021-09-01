import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
const Profile = () => {
    const user = useSelector(({ user }) => user, shallowEqual);
    return (
        <div>
            <h1>Welcome to your profile, {user.username}!</h1> 
            <ul>
                {Object.keys(user).map(key => 
                    <li>{key}: {user[key]}</li>
                )}
            </ul>
        </div>
    );
};
export default Profile