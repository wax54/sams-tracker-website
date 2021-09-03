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

    static async login({username, password}) {
        try {
            const resp = await axios.post(API_URL + "/users/login", { username, password });
            this.token = resp.data.token;
            userPersist.set(this.token);
            return { status: true, user: resp.data.user };
        } catch (e) {
            const errors = getMessagesFromErrorRes(e);
            return { status: false, errors };
        }
    }
    static async register({username, password}) {
        try {
            const resp = await axios.post(API_URL + "/users/register", { username, password });
            this.token = resp.data.token;
            userPersist.set(this.token);
            return { status: true, user: resp.data.user };
        } catch (e) {
            const errors = getMessagesFromErrorRes(e);
            return { status: false, errors };
        }
    }
    static async getShifts() {
        if(!this.token) return { status: false, errors: ["USER NOT LOGGED IN"] };
        try {
            const shifts = [];
            let resp;
            let page = 0;
            do {
                resp = await axios.post(API_URL + "/users/shifts", {token: this.token, page} );
                shifts.push(...resp.data.shifts)
                page++;
            } while (resp.data.shifts.length);

            return { status: true, shifts };
        } catch (e) {
            const errors = getMessagesFromErrorRes(e);
            return { status: false, errors };
        }
    }
    static async addShift(shift) {
        try {
            const resp = await axios.post(API_URL + "/shifts/", {shift, token: this.token});
            return { status: true, shift: resp.data.shift };
        } catch (e) {
            const errors = getMessagesFromErrorRes(e);
            return { status: false, errors };
        }
    }
    static async updateShift(id, shift) {
        try {
            console.log(shift);
            const resp = await axios.patch(API_URL + `/shifts/${id}`, { shift, token: this.token });
            return { status: true, shift: resp.data.shift };
        } catch (e) {
            const errors = getMessagesFromErrorRes(e);
            return { status: false, errors };
        }
    }
    static async clockOutShift(id, time) {
        try {
            const resp = await axios.patch(API_URL + `/shifts/${id}`, { shift:{stop: time}, token: this.token });
            return { status: true, shift: resp.data.shift };
        } catch (e) {
            const errors = getMessagesFromErrorRes(e);
            return { status: false, errors };
        }
    }
    static async deleteShift(id) {
        try {
            const resp = await axios.delete(API_URL + `/shifts/${id}`, { data:{ token: this.token }});
            return { status: true };
        } catch (e) {
            const errors = getMessagesFromErrorRes(e);
            return { status: false, errors };
        }
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