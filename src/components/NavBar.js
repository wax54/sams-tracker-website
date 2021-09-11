import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { resetUser } from '../models/redux/actionCreators';
const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(({user}) => user);

    const logoutUser = () => {
        dispatch(resetUser());
    }
    return (
        <div className="navbar navbar-expand-sm navbar-dark bg-primary">
            <span className="navbar-brand px-4">Time Traker <i className="fas fa-chart-line fa-md"></i></span>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navLinks">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse navbar-nav text-center justify-content-between mx-3" id="navLinks">
                {user.id ?
                <>

                    <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                    <NavLink exact to="/profile" className="nav-item nav-link">Profile</NavLink>
                    <NavLink exact to="/edit-shifts" className="nav-item nav-link">Modify Shifts</NavLink>
                    <NavLink exact to="/set-goals" className="nav-item nav-link">Set Goals</NavLink>
                    <Link onClick={logoutUser} to="/logout" className="nav-item nav-link bg-danger">Logout</Link>

                </> : <>
                    <NavLink exact to="/login" className="nav-item nav-link">Login</NavLink>
                    <NavLink exact to="/signup" className="nav-item nav-link">Sign Up</NavLink>
                </>
                }
                {/* <a href="all-hours.html" class="nav-item nav-link">See Stats</a> */}
            </div>
        </div>
    )
};

export default NavBar
