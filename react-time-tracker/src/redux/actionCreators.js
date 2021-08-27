import axios from "axios";

export function startShift(type, category) {
    const newShift = {start: new Date(), type, category};
    return { type:"START_SHIFT", payload: newShift };
}

export function endShift({ start, type, category }) {
    const end = new Date();
    const newShift = { start, type, category, end };
    return { type: "UPDATE_SHIFT", payload: newShift };
}

export function clockOutAt({ start, type, category }, end = new Date()) {
    const newShift = { start, type, category, end };
    return { type: "UPDATE_SHIFT", payload: newShift };
}

export function authorizeUser({ username, password }) {
    return async function (dispatch) {
        try {
            const resp = await axios.get("/api/auth/login", { username, password });
            dispatch({ type: "SET_USER", payload: resp });
        } catch (e) {
            dispatch({ type: "ADD_ERROR", payload: e });
        }
    }
}

export function registerUser({ username, password }) {
    return async function (dispatch) {
        try {
            const resp = await axios.get("/api/auth/register", { username, password });
            dispatch({ type: "SET_USER", payload: resp });
        } catch (e) {
            dispatch({ type: "ADD_ERROR", payload: e });
        }
    }
}