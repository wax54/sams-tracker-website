import { Shift } from "../ShiftCollection";

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