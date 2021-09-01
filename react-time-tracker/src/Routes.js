import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import Login from './Forms/Login';
import Signup from './Forms/Signup';

function Routes() {
    return (
        <Switch>
            {/* <Route exact path="/profile"><Profile/></Route> */}
            {/* <Route exact path="/edit-shifts"><ShiftList /></Route> */}
            <Route exact path="/login"> <Login /> </Route>
            <Route exatc path="/signup"> <Signup /> </Route>
            <Route exact path="/"> <Home /> </Route>
            <Redirect to="/" />
        </Switch>
    );
}

export default Routes;
