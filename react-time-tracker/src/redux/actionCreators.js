import axios from "axios";
import UserApi from "../api";

export function startShift(type, category) {
    return async function (dispatch) {
        const newShift = {start: new Date(), type, category};
        const resp = await UserApi.addShift(newShift);
        if (resp.status === true) {
            dispatch({ type: "START_SHIFT", payload: resp.shift });
            return true;
        }
        if (resp.status === false) {
            console.error(resp.errors);
            return false;
            //TODO make a queue for failed shift uploads to be merged later
            //dispatch({ type: "ADD_SHIFT_TO_UPLOAD_QUEUE", payload: newShift })
        }
    }
}

export function refreshShifts() {
    return async function (dispatch) {
        const resp = await UserApi.getShifts();
        if (resp.status === true) {
            dispatch({ type: "LOAD_SHIFT", payload: resp.shifts });
            return true;
        }
        if (resp.status === false) {
            console.error(resp.errors);
            return false;
            //TODO make a queue for failed shift uploads to be merged later
            //dispatch({ type: "ADD_SHIFT_TO_UPLOAD_QUEUE", payload: newShift })
        }
    }
}


export function endShift(id) {
    const stop = new Date();
    return clockOutAt(id, stop);
}

export function clockOutAt(shiftId, stop) {
    return async function(dispatch) {
        const resp = await UserApi.clockOutShift(shiftId, stop);
        if (resp.status === true) {
            dispatch({ type: "UPDATE_SHIFT", payload: resp.shift });
            return true;
        }
        if (resp.status === false) {
            console.error(resp.errors);
            return false;
        }
    }
}

export function resetErrors() {
    return { type: "RESET_ERRORS" };
}

export function authorizeUser({ username, password }) {
    return async function (dispatch) {
        const resp = await UserApi.login({username, password});
        if(resp.status === true)
            dispatch({ type: "SET_USER", payload: resp.user });
        return resp;
    }
}

export function registerUser({ username, password }) {
    return async function (dispatch) {
        const resp = await UserApi.register({ username, password });
        if (resp.status === true)
            dispatch({ type: "SET_USER", payload: resp.user });
        return resp;
    }
}

