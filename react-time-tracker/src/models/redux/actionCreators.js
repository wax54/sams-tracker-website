import UserApi from "../Api";
/** SHIFTS */
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

export function resetShifts() {
    return { type: "RESET_SHIFTS" };
}

export function loadShifts() {
    return async function (dispatch) {
        const resp = await UserApi.getShifts();
        if (resp.status === true) {
            dispatch({ type: "LOAD_SHIFTS", payload: resp.shifts });
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
        dispatch(resetShifts());
        return await dispatch(loadShifts());
    }
}

export function updateShift(shift) {
    return { type: "UPDATE_SHIFT", payload: shift };
}
export function endShift(id) {
    const stop = new Date();
    return clockOutAt(id, stop);
}

export function clockOutAt(shiftId, stop) {
    return async function(dispatch) {
        const resp = await UserApi.clockOutShift(shiftId, stop);
        if (resp.status === true) {
            dispatch(updateShift(resp.shift));
            return true;
        }
        if (resp.status === false) {
            //TODO effect the change on client side and 
            //  queue up the shift to be updated on next refresh
            console.error(resp.errors);
            return false;
        }
    }
}

/** ERRORS (depreciated) */
export function resetErrors() {
    return { type: "RESET_ERRORS" };
}
/** Users */
export function setUser(userData) {
    return { type: "SET_USER", payload: userData };
}

export function authorizeUser({ username, password }) {
    return async function (dispatch) {
        const resp = await UserApi.login({username, password});
        if(resp.status === true)
            dispatch(setUser(resp.user));
            dispatch(refreshShifts());
        return resp;
    }
}

export function registerUser({ username, password }) {
    return async function (dispatch) {
        const resp = await UserApi.register({ username, password });
        if (resp.status === true)
            dispatch(setUser(resp.user));
            dispatch(resetShifts());
        return resp;
    }
}

