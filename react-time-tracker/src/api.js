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
    static async addShift(shift) {
        try {
            const resp = await axios.post("/api/shifts/", {shift, token: this.token});
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

module.exports = UserApi;