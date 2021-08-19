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
    let tempState;
    let category;
    let type;

    switch (action.type) {
        case "START_SHIFT":
            tempState = {...state};
            category = action.payload.category;
            type = action.payload.type;
            if(tempState[category]) {
                if(tempState[category][type]) {
                    temp = tempState[category][type];
                    tempState[category][type] = [...temp, action.payload];
                } else {
                    tempState[category][type] = [action.payload];
                }
            } else {
                tempState[category] = { [type]: [action.payload] };
            }
            return tempState;

        case "UPDATE_SHIFT":
            tempState = {...state};
            category = action.payload.category;
            type = action.payload.type;
            if (tempState[category][type]) {
                const shiftIdx = tempState[category][type].findIndex(shift => shift.start.getTime() == action.payload.start.getTime());
                if (shiftIdx === -1) {
                    console.error("MAjoR ERRRO UPDATED A SHIFT THAT DOENS'T EXIST ( OR DATE COMPARE IS WEIRD")
                    return null;
                }
                tempState[category][type][shiftIdx] = action.payload;
            } else {
                console.error("MAjoR ERRRO UPDATED A SHIFT THAT CAT AND TYPE DOENS'T EXIST")
                return null;
            }
            return tempState;

        default:
            return state;
    }
}
export default shifts