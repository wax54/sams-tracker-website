import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './scenes/Home';
import Login from './forms/Login';

import Signup from './forms/Signup';
import Profile from "./Profile";
import SetGoals from "./scenes/SetGoals";
import EditShifts from "./scenes/EditShifts";
import { useSelector } from "react-redux";

function Routes() {
    const user = useSelector(({user}) => user);
    if(user.id)
        return (
            <Switch>

                <Route exact path="/profile"> <Profile /> </Route>
                <Route exact path="/set-goals"> <SetGoals /> </Route>
                <Route exact path="/edit-shifts"> <EditShifts /> </Route>
                <Route exact path="/"> <Home /> </Route>
                <Redirect to="/" />
            </Switch>
        );
    else 
        return (
            <Switch>

                <Route exact path="/login"> <Login /> </Route>
                <Route exact path="/signup"> <Signup /> </Route>
                <Redirect to="/login" />
            </Switch>
        );
}

export default Routes;
