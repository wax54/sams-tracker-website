import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './scenes/Home';
import Login from './forms/Login';
import Signup from './forms/Signup';
import Profile from "./Profile";
import SetGoals from "./forms/SetGoals";
import EditShifts from "./scenes/EditShifts";

function Routes() {
    return (
        <Switch>
            {/* <Route exact path="/profile"><Profile/></Route> */}
            {/* <Route exact path="/edit-shifts"><ShiftList /></Route> */}
            <Route exact path="/login"> <Login /> </Route>
            <Route exatc path="/signup"> <Signup /> </Route>
            <Route exact path="/profile"> <Profile /> </Route>
            <Route exact path="/set-goals"> <SetGoals /> </Route>
            <Route exact path="/edit-shifts"> <EditShifts /> </Route>
            <Route exact path="/"> <Home /> </Route>
            <Redirect to="/" />
        </Switch>
    );
}

export default Routes;
