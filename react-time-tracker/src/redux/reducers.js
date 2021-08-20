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
const INITIAL_STATE = [];

function shifts(shifts = INITIAL_STATE, action) {
    let newShift;
    switch (action.type) {
        case "START_SHIFT":
            newShift = new Shift(action.payload);
            return [...shifts, newShift ];

        case "UPDATE_SHIFT":
            newShift = new Shift(action.payload);
            return shifts.map(shift => {
                shift = new Shift(shift);
                console.log('1', shift);
                console.log('2', newShift);
                return shift.equals(newShift, true) ?
                    action.payload :
                    shift
            });

        default:
            return shifts;
    }
}
export default combineReducers({
    shifts
});