import { store } from './store';
import UserApi from './Api';
import { v4 as uuid } from "uuid";

class UploadQueue {
    //array of objects [{ type, data },...]
    static getQueue() { return [ ...store.getState().shiftQueue ] };

    static async addToQueue({ type, data }) {
        //when a command is added to the upload queue(for instance addShift)
        //the command is attempted immediately
        const resp = await this.run({ type, data });
        //if success, 
        //  try the rest of the commands in the upload queue
        if(resp.status) this.runAll();
    }

    static async run({ type, data }){
        const id = uuid();
        store.dispatch({ type: "ADD_SYNCING", payload: { id, name: type} });

        const resp = await this[type](data);
        
        store.dispatch({ type: "REMOVE_SYNCING", payload: id });

        if (resp.status === false) {
            console.error(resp.errors);
            store.dispatch({ type: "ADD_TO_UPLOAD_QUEUE", payload: { type, data } });
        }
        return resp;
    }
    
    static async runAll() {
        //get the queue
        const queue = this.getQueue();
        //reset the queue
        store.dispatch({type:"RESET_UPLOAD_QUEUE"})
        for(let command in queue) {
            //if the command fails, it automatically adds it to the upload queue
            this.run(command);
        //TODO
        //    if those fail, add to error pool
        //      if fail due to DB ERROR, add to upload Queue
        //      if fail due to other,
        }
    }


    static async addShift(newShift) {
        const resp = await UserApi.addShift({ ...newShift, id: undefined });
        if (resp.status === true) {
            //update store to reflect new state (ie. replace id with new ID, or update shift with latest data)
            store.dispatch({ type: "DELETE_SHIFT", shiftId: newShift.id });
            store.dispatch({ type: "START_SHIFT", payload: resp.shift });
        }
        return resp;
    }

    static async updateShift(shift) {
        const resp = await UserApi.updateShift(shift.id, shift);
        if (resp.status === true) {
            store.dispatch({ type: "UPDATE_SHIFT", payload: shift });
        }
        return resp;
    }
    static async deleteShift(shiftId) {
        return await UserApi.deleteShift(shiftId);
        
    }


    static async addGoal(goal) {
        return await UserApi.addGoal(goal);
    }
    static async updateGoal({type, category, seconds_per_day}) {
        return await UserApi.updateGoal({ type, category }, seconds_per_day);
    }
    static async deleteGoal({ type, category }) {
        return await UserApi.removeGoal({ category, type });
    }
}

export default UploadQueue