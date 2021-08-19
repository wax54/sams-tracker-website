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
const INITIAL_STATE = {};

function shifts(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "START_SHIFT":
            let tempState = {...state};
            tempState[action.payload.category] 

        case LOAD_PLANET:
            return {
                ...state,
                [action.payload.id]: { ...action.payload }
            };

        default:
            return state;
    }
}