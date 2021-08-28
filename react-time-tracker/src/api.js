import axios from "axios";
class UserApi {
    static token = "";

    static async login({username, password}) {
        try {
            const resp = await axios.post("/api/users/login", { username, password });
            this.token = resp.data.token;
            return { status: true, user: resp.data.user };
        } catch (e) {
            const errors = getMessagesFromErrorRes(e);
            return { status: false, errors };
        }
    }
    static async register({username, password}) {
        try {
            const resp = await axios.post("api/users/register", { username, password });
            this.token = resp.data.token;
            return { status: true, user: resp.data.user };
        } catch (e) {
            const errors = getMessagesFromErrorRes(e);
            return { status: false, errors };
        }
    }
    static async getShifts() {
        try {
            const shifts = [];
            let resp;
            let page = 0;
            do {
                resp = await axios.get("/api/users/shifts", { params:{token: this.token, page }});
                shifts.push(resp.data.shifts)
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
            const resp = await axios.post("/api/shifts/", {shift, token: this.token});
            return { status: true, shift: resp.data.shift };
        } catch (e) {
            const errors = getMessagesFromErrorRes(e);
            return { status: false, errors };
        }
    }
    static async clockOutShift(id, time) {
        try {
            const resp = await axios.patch(`/api/shifts/${id}`, { shift:{stop: time}, token: this.token });
            return { status: true, shift: resp.data.shift };
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