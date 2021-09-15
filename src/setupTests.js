// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


export const MockApi = {
    CONNECTION_ERROR : "DB CONNECTION ERROR",
    VALID_CREDENTIALS : {username: "John Smith", password: "I AM GREAT"},
    VALID_USER : {
        id: 0, username: "John Smith", join_at: new Date(), last_login_at: new Date()
    },
    API_URL: "",
    token: false,
    
        //    { status: true, data: resp.data[type] };
        //    { status: false, errors };

    //USERS
    async login({ username, password }) {
        if(username === this.VALID_CREDENTIALS.username &&
            password === this.VALID_CREDENTIALS.password) {
            this.token = true;
            return {status: true, user:this.VALID_USER};
        } else {
            this.token = false;
            return { status: false, errors: [`Invalid Credentials!`] };
        }
    },

    async register({ username, password }) {
        if (username === this.VALID_CREDENTIALS.username &&
            password === this.VALID_CREDENTIALS.password) {
            this.token = true;
            return { status: true, user: this.VALID_USER };
        } else {
            this.token = false;
            return { status: false, errors: [`Invalid Credentials!`] };
        }
    },

    //SHIFTS
    getShifts: async function() {
        // if (!this.token) return { status: false, errors: ["USER NOT LOGGED IN"] };
        const shifts = [];
        return { status: true, shifts };
    },


    async addShift(shift) {
        const resp = await this.request({
            method: "post",
            url: this.API_URL + "/shifts/",
            data: { shift }
        });
        if (resp.status === false) return resp;
        else return { status: true, shift: resp.data.shift };
    },
    async updateShift(id, shift) {
        const resp = await this.request({
            method: "patch",
            url: this.API_URL + `/shifts/${id}`,
            data: { shift }
        });
        if (resp.status === false) return resp;
        return { status: true, shift: resp.data.shift };

    }
    ,async clockOutShift(id, time) {
        const resp = await this.request({
            method: "patch",
            url: this.API_URL + `/shifts/${id}`,
            data: { shift: { stop: time } }
        });
        if (resp.status === false) return resp;
        return { status: true, shift: resp.data.shift };

    },
    async deleteShift(id) {
        const resp = await this.request({
            method: "delete",
            url: this.API_URL + `/shifts/${id}`
        });
        if (resp.status === false) return resp;
        return { status: true };
    },

    //GOALS
    async getGoals() {
        const goals = [];
        return { status: true, goals: goals };

    },
    async addGoal(goal) {
        const resp = await this.request({
            method: "post",
            url: this.API_URL + "/goals",
            data: { goal }
        });
        if (resp.status === false) return resp;
        return { status: true, goal: resp.data.goal };
    },
    async updateGoal({ category, type }, seconds_per_day) {

        const resp = await this.request({
            method: "patch",
            url: this.API_URL + "/goals/",
            data: { goal: { seconds_per_day, category, type } }
        });
        if (resp.status === false) return resp;
        return { status: true, goal: resp.data.goal };

    },
    async removeGoal({ category, type }) {
        const resp = await this.request({
            method: "delete",
            url: this.API_URL + `/goals/`,
            data: { goal: { type, category } }
        });
        if (resp.status === false) return resp;
        return { status: resp.data.deleted };
    }

}

jest.mock('./models/Api', () => ({ ...MockApi }));
