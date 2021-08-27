import { emit } from "process";
import { combineReducers } from "redux";
import {Shift} from "../ShiftCollection";
// EX
// import { combineReducers } from "redux";
// function planets(state = INITIAL_STATE, action) {
//     switch (action.type) {
//         case RESET_ALL:
//             return { ...INITIAL_STATE };

//         case LOAD_PLANET:
//             return {
//                 ...state,
//                 [action.payload.id]: { ...action.payload }
//             };

//         default:
//             return state;
//     }
// }


// export default combineReducers({
//     films,
//     planets,
//     people,
// });
const SHIFTS_INITIAL_STATE = [];

function shifts(shifts = SHIFTS_INITIAL_STATE, action) {
    let newShift;
    switch (action.type) {
        case "START_SHIFT":
            newShift = new Shift(action.payload);
            return [...shifts, newShift ];

        case "UPDATE_SHIFT":
            newShift = new Shift(action.payload);
            return shifts.map(shift => {
                shift = new Shift(shift);
                return shift.equals(newShift, true) ?
                    action.payload :
                    shift
            });

        default:
            return shifts;
    }
}

const ERRORS_INITIAL_STATE = [];

function errors(errors = ERRORS_INITIAL_STATE, action) {
    switch (action.type) {
        case "ADD_ERROR":
            return [...errors, action.payload];

        case "REMOVE_ERROR":
            //to be improved
            return errors.filter(e => e.message !== payload.message)

        default:
            return errors;
    }
}

const USER_INITIAL_STATE = {};
function user(user = USER_INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_USER":
            return action.payload;

        case "RESET_USER":
            return USER_INITIAL_STATE;

        default:
            return user;
    }
}
export default combineReducers({
    shifts,
    user,
    errors
});