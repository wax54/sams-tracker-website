import axios from "axios";
import UserApi from "../api";

export function startShift(type, category) {
    return async function (dispatch) {
        const newShift = {start: new Date(), type, category};
        const resp = await UserApi.addShift(newShift);

        dispatch({ type: "START_SHIFT", payload: newShift });
        if (resp.status === false) {
            dispatch({ type: "ADD_SHIFT_TO_UPLOAD_QUEUE", payload: newShift })
        }
    }

}

export function endShift(id) {
    const end = new Date();
    return clockOutAt(id, end);
}

export function clockOutAt(id, end) {

    return { type: "UPDATE_SHIFT", payload: {start, type, category, u_id, end} };
}

export function resetErrors() {
    return { type: "RESET_ERRORS" };
}

export function authorizeUser({ username, password }) {
    return async function (dispatch) {
        const resp = UserApi.login({username, password});
        if(resp.status === true)
            dispatch({ type: "SET_USER", payload: resp.user });
        return resp;
    }
}

export function registerUser({ username, password }) {
    return async function (dispatch) {
        const resp = UserApi.register({ username, password });
        if (resp.status === true)
            dispatch({ type: "SET_USER", payload: resp.user });
        return resp;
    }
}

