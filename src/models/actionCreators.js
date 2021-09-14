import UserApi from "./Api";
import {v4 as uuid} from "uuid";
import UploadQueue from "./UploadQueue";
import { store } from "./store";
import { SET_TIMEFRAME } from "./actionTypes";

/** Timeframes */
export function setTimeFrame(timeframeKey) {
    return { type: SET_TIMEFRAME, payload: timeframeKey };
}

/** SHIFTS */
export function startShift(type, category) {
    const tempId = uuid();
    const newShift = {id: tempId, start: new Date(), type, category};
    
    // add a command and shift/data to the upload queue
    UploadQueue.addToQueue({type:"addShift", data: newShift});
    //add the shift to the store
    return { type: "START_SHIFT", payload: newShift };
}

export function resetShifts() {
    return { type: "RESET_SHIFTS" };
}

export function loadShifts() {
    return async function (dispatch) {
        const resp = await UserApi.getShifts();
        if (resp.status === true) {
            dispatch({ type: "ADD_SHIFTS", payload: resp.shifts });
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
    UploadQueue.addToQueue({ type: "updateShift", data: shift });
    return updateShift(shift);
}

export function endShift(id) {
    const stop = new Date();
    return clockOutAt(id, stop);
}

export function clockOutAt(shiftId, stop) {
    const shift = store.getState().shifts[shiftId];
    shift.stop = stop;
    UploadQueue.addToQueue({type: 'updateShift', data: shift})
    return updateShift(shift);
}

export function deleteShift(shiftId) {
    UploadQueue.addToQueue({type: 'deleteShift', data: shiftId});
    return { type: "DELETE_SHIFT", shiftId: shiftId };
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
    const newGoal = { seconds_per_day, type, category };
    UploadQueue.addToQueue({type: "addGoal", data: newGoal});
    return {type: "ADD_GOAL", payload: newGoal};
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

export function updateAGoal(goal) {
    UploadQueue.addToQueue({type: "updateGoal", data: goal});
    return updateGoal(goal);
}

export function deleteGoal({ type, category }) {
    UploadQueue.addToQueue({type: "deleteGoal", data: { type, category }})
    return { type: "DELETE_GOAL", payload: { category, type } };
}