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

export function updateAShift(shift) {
    return async function (dispatch) {
        const resp = await UserApi.updateShift(shift.id, shift);
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

export function endShift(id) {
    const stop = new Date();
    return clockOutAt(id, stop);
}

export function clockOutAt(shiftId, stop) {
    return async function (dispatch) {
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

export function deleteShift(shiftId) {
    return async function (dispatch) {
        const resp = await UserApi.deleteShift(shiftId);
        if (resp.status === true) {
            dispatch({ type: "DELETE_SHIFT", shiftId: shiftId });
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
export function resetUser() {
    return async function (dispatch) { 
        dispatch({ type: "RESET_USER" });
        dispatch(resetShifts());
        dispatch(resetGoals());
    }
}
export function authorizeUser({ username, password }) {
    return async function (dispatch) {
        const resp = await UserApi.login({username, password});
        if(resp.status === true)
            dispatch(setUser(resp.user));
            await dispatch(refreshShifts());
            await dispatch(refreshGoals());

        return resp;
    }
}

export function registerUser({ username, password }) {
    return async function (dispatch) {
        const resp = await UserApi.register({ username, password });
        if (resp.status === true)
            dispatch(setUser(resp.user));
            dispatch(resetShifts());
            dispatch(resetGoals());
        return resp;
    }
}

/** GOALS */
export function addGoal({type, category, seconds_per_day}) {
    return async function (dispatch) {
        const newGoal= { seconds_per_day, type, category };
        const resp = await UserApi.addGoal(newGoal);
        if (resp.status === true) {
            dispatch({ type: "ADD_GOAL", payload: resp.goal });
            return true;
        }
        if (resp.status === false) {
            console.error(resp.errors);
            return false;
        }
    }
}

export function resetGoals() {
    return { type: "RESET_GOALS" };
}

export function loadGoals() {
    return async function (dispatch) {
        const resp = await UserApi.getGoals();
        console.log(resp);
        if (resp.status === true) {
            dispatch({ type: "LOAD_GOALS", payload: resp.goals });
            return true;
        }
        if (resp.status === false) {
            console.error(resp.errors);
            return false;
        }
    }
}

export function refreshGoals() {
    return async function (dispatch) {
        dispatch(resetGoals());
        return await dispatch(loadGoals());
    }
}

export function updateGoal({type, category, seconds_per_day}) {
    return { type: "UPDATE_GOAL", payload: {type, category, seconds_per_day} };
}

export function updateAGoal({ type, category, seconds_per_day }) {
    return async function (dispatch) {
        const resp = await UserApi.updateGoal({type, category}, seconds_per_day);
        if (resp.status === true) {
            dispatch(updateGoal(resp.goal));
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

export function deleteGoal({ type, category }) {
    return async function (dispatch) {
        const resp = await UserApi.removeGoal({category, type});
        if (resp.status === true) {
            dispatch({ type: "DELETE_GOAL", payload: {category, type} });
            return true;
        } else {
            //TODO effect the change on client side and 
            //  queue up the shift to be updated on next refresh
            console.error(resp.errors);
            return false;
        }
    }
}