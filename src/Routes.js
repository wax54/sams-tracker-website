import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import Login from './components/users/Login';

import Signup from './components/users/Signup';
import Profile from "./Profile";
import SetGoals from "./SetGoals";
import EditShifts from "./EditShifts";
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
