import axios from "axios";

let API_URL;
if(process.env.NODE_ENV !== "production") {
    //set the API to call port 5000 if not in productions
    API_URL = "http://localhost:5000/api";
} else {
    //if in production, call the api endpoint of itself
    API_URL = "/api";
}

const userPersist = {
    get: function () {
        return localStorage.USERTOKEN || "";
    },
    set: function (token) {
        return localStorage.USERTOKEN = token;
    }
}

class UserApi {
    static token = userPersist.get();
    static async request({ method="get", url, data }) {
        try {
            const headers = this.token ?
                { Authorization: `${this.token}` } 
                :   {};
            const dataType  = (method === "get") ? "params" : "data" ;
            data = (method === "delete") ? { data: data } : data;

            const resp = await axios({
                method,
                url,
                [dataType]: data,
                headers,
            });
            return { status: true, data: resp.data };
        } catch (e) {
            const errors = getMessagesFromErrorRes(e);
            return { status: false, errors };
        }
    }

    //USERS

    static async login({ username, password }) {
        const resp = await this.request({
            method: "post",
            url: API_URL + "/users/login", 
            data: { username, password }
        });
        if (resp.status === false) return resp;

        this.token = resp.data.token;
        userPersist.set(this.token);
        return { status: true, user: resp.data.user };
    }

    static async register({username, password}) {
        const resp = await this.request({
            method:"post",
            url: API_URL + "/users/register", 
            data: { username, password }
        });
        if (resp.status === false) return resp;
        this.token = resp.data.token;
        userPersist.set(this.token);
        return { status: true, user: resp.data.user };
    }

    //SHIFTS
    static async getShifts() {
        if(!this.token) return { status: false, errors: ["USER NOT LOGGED IN"] };
        const shifts = [];
        let resp;
        let page = 0;
        do {
            resp = await this.request({
                method: 'get',
                url: API_URL + "/users/shifts", 
                data: { page } 
            });
            console.log(resp);
            if(resp.status === false) return resp;
            shifts.push(...resp.data.shifts)
            page++;
        } while (resp.data.shifts.length);
        return { status: true, shifts };
    }


    static async addShift(shift) {
        const resp = await this.request({
            method: "post",
            url: API_URL + "/shifts", 
            data: { shift }
        });
        if(resp.status === false) return resp;
        else return { status: true, shift: resp.data.shift };
    }
    
    static async updateShift(id, shift) {
        const resp = await this.request({
            method: "patch",
            url: API_URL + `/shifts/${id}`, 
            data: { shift }
        });
        if (resp.status === false) return resp;
        return { status: true, shift: resp.data.shift };
        
    }
    static async clockOutShift(id, time) {
        const resp = await this.request({
            method: "patch",
            url: API_URL + `/shifts/${id}`, 
            data:{ shift:{stop: time} }
        });
        if (resp.status === false) return resp;
        return { status: true, shift: resp.data.shift };
    
    }
    static async deleteShift(id) {
        const resp = await this.request({
            method: "delete",
            url: API_URL + `/shifts/${id}`
        });
        if (resp.status === false) return resp;
        return { status: true };
    }

    //GOALS
    static async getGoals() {
        const resp = await this.request({
            method: "get",
            url: API_URL + `/users/goals`});
        if (resp.status === false) return resp;
        return { status: true, goals: resp.data.goals };
        
    }
    static async addGoal(goal) {
        const resp = await this.request({
            method: "post",
            url: API_URL + "/goals", 
            data: { goal }
        });
        if (resp.status === false) return resp;
        return { status: true, goal: resp.data.goal };
    }


    static async updateGoal({ category, type },  seconds_per_day ) {
        const resp = await this.request({
            method: "patch",
            url: API_URL + "/goals/", 
            data: { goal: { seconds_per_day, category, type }}
        });
        if (resp.status === false) return resp;
        return { status: true, goal: resp.data.goal };
        
    }

    static async removeGoal({ category, type }) {
        const resp = await this.request({
            method: "delete",
            url: API_URL + `/goals/`,
            data:{ goal: {type, category} }
        });
        if (resp.status === false) return resp;
        return { status: resp.data.deleted };
    }
}

function getMessagesFromErrorRes(e) {
    if (e.response) {
        console.error("API Error:", e.response);
        let message = e.response.data.error.message;
        return Array.isArray(message) ? message : [message];
    } else return ["DB CONNECTION ERROR"];
}

export default UserApi;