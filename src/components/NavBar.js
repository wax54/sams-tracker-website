import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { setTimeFrame } from '../models/redux/actionCreators';
import { timeFrames } from '../helpers/config';
const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(({user}) => user);
    const timeFrameKey = useSelector(({timeFrame}) => timeFrame)
    const handleTimeFrameChange = evt => dispatch(setTimeFrame(evt.target.value));

    
    return (
        <div className="navbar navbar-expand-sm navbar-dark bg-primary">
            <NavLink exact to="/" className="nav-item nav-link navbar-brand px-4">Time Traker <i className="fas fa-chart-line fa-md"></i></NavLink>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navLinks">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse navbar-nav text-center justify-content-start mx-3" id="navLinks">
                {user.id ?
                <>
                        <NavLink exact to="/" className="nav-item nav-link mx-3 btn btn-primary border border-dark ">Home</NavLink>
                        <NavLink exact to="/edit-shifts" className="nav-item nav-link mx-3 btn btn-primary border border-dark">Shifts</NavLink>
                        <NavLink exact to="/set-goals" className="nav-item nav-link mx-3 btn btn-primary border border-dark">Goals</NavLink>
                        <NavLink exact to="/profile" className="nav-item nav-link mx-3 btn btn-primary border border-dark ">{user.username}</NavLink>
                        <div className="input-group">
                            <label className="input-group-text">Time Frame</label>
                            <select
                                className="form-control"
                                id="nav-timeframe-selector"
                                name='timeFrame'
                                onChange={handleTimeFrameChange}
                                value={timeFrameKey}
                            >
                                {Object.keys(timeFrames).map(key =>
                                    <option key={key} value={key}>{timeFrames[key].title}</option>
                                )}
                            </select>
                        </div>

                </> : <>
                        <NavLink exact to="/login" className="nav-item nav-link  btn">Login</NavLink>
                        <NavLink exact to="/signup" className="nav-item nav-link  btn">Sign Up</NavLink>
                </>
                }
                {/* <a href="all-hours.html" class="nav-item nav-link">See Stats</a> */}
            </div>
        </div>
    )
};

export default NavBar
