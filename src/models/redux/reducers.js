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
const SHIFTS_INITIAL_STATE = {};

function shifts(shifts = SHIFTS_INITIAL_STATE, action) {
    
    switch (action.type) {
        case "START_SHIFT":
            const newShift = new Shift(action.payload);
            return {...shifts, [newShift.id]: newShift };
        case "ADD_SHIFTS":
            shifts = {...shifts}
            action.payload.forEach(shift => shifts[shift.id] = shift );
            return shifts;
        case "UPDATE_SHIFT":
            const updatedShift = new Shift(action.payload);
            return { ...shifts, [updatedShift.id]: updatedShift };
        case "DELETE_SHIFT":
            shifts = { ...shifts };
            delete shifts[action.shiftId];
            return shifts;
        case "RESET_SHIFTS":
            return SHIFTS_INITIAL_STATE;
        default:
            return shifts;
    }
}
const GOALS_INITIAL_STATE = [];

function goals(goals = GOALS_INITIAL_STATE, action) {
    switch (action.type) {
        case "ADD_GOAL":
            return [ ...goals, action.payload ];
        case "LOAD_GOALS":
            console.log(action.payload);
            return [...goals, ...action.payload ];
        case "UPDATE_GOAL":
            const nGoal = action.payload
            return goals.map(goal => (goal.type === nGoal.type && 
                                    goal.category === nGoal.category) ? 
                            nGoal : goal);
        case "DELETE_GOAL":
            const seeking = action.payload
            console.log(goals.filter(goal => !(goal.type === seeking.type &&
                goal.category === seeking.category)));
            return goals.filter(goal => !(goal.type === seeking.type &&
                goal.category === seeking.category));
        case "RESET_GOALS":
            return GOALS_INITIAL_STATE;
        default:
            return goals;
    }
}

const QUEUE_INITIAL_STATE = [];

function shiftQueue(shifts = QUEUE_INITIAL_STATE, action) {
    switch (action.type) {
        case "ADD_TO_UPLOAD_QUEUE":
            console.log("HELLO")
            return [...shifts, action.payload];

        case "SET_UPLOAD_QUEUE":
            //to be improved
            return [...action.payload]
        
        case "RESET_UPLOAD_QUEUE":
            //to be improved
            return [...QUEUE_INITIAL_STATE];

        default:
            return shifts;
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

const SYNCING_INIT = {};
function syncing(syncing = SYNCING_INIT, action) {
    switch (action.type) {
        case "ADD_SYNCING":
            return {...syncing, [action.payload.id]: action.payload.name};
            
        case "REMOVE_SYNCING":
            const returned = {...syncing };
            delete returned[action.payload];
            return returned;

        case "RESET_SYNCING":
            return SYNCING_INIT;

        default:
            return syncing;
    }
}

export default combineReducers({
    shifts,
    user,
    shiftQueue,
    goals,
    syncing
});