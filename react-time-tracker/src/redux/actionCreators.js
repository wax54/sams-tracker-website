import axios from "axios";

function getMessagesFromErrorRes(e) {
    if (e.response) {
        console.error("API Error:", e.response);
        let message = e.response.data.error.message;
        return Array.isArray(message) ? message : [message];
    } else return ["DB CONNECTION ERROR"];
}

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

export function resetErrors() {
    return { type: "RESET_ERRORS" };
}

export function authorizeUser({ username, password }) {
    return async function (dispatch) {
        try {
            dispatch({ type: "RESET_ERROR"});
            const resp = await axios.post("/api/users/login", { username, password });
            dispatch({ type: "SET_USER", payload: resp.data.user });
            return { status: true, user: resp.data.user };
        } catch (e) {
            const errors = getMessagesFromErrorRes(e);
            return {status: false, errors};
        }
    }
}

export function registerUser({ username, password }) {
    return async function (dispatch) {
        try {
            dispatch({ type: "RESET_ERROR" });
            const resp = await axios.post("api/users/register", {username, password });
            dispatch({ type: "SET_USER", payload: resp.data.user });
            return {status: true, user: resp.data.user};
        } catch (e) {
            const errors = getMessagesFromErrorRes(e);
            return { status: false, errors };
        }
    }
}

