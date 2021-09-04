const db = require("../db");

const emptyResult = res => res.rows.length === 0;

/** Collection of related methods for shifts. */

class Goal {
    /** given an id, return shift data with that id:
     *
     * => {id, start, stop, category, type, u_id}
     *
     **/

    static async get({ type, category, u_id }) {

        const goalRes = await db.query(
            `SELECT u_id, type, category, seconds_per_day
            FROM goals
            WHERE u_id = $1 AND type = $2 AND category =$3`, 
            [ u_id, type, category ]);

        if (emptyResult(goalRes)) {
            throw {
                message: `There is no goal with the u_id='${U_id}', type='${type} and, category='${category}'`, status: 404 }
        }
        return goalRes.rows[0];
    }

    static async getAll(u_id) {
        const goalRes = await db.query(
            `SELECT u_id, type, category, seconds_per_day
            FROM goals
            WHERE u_id = $1`,
            [u_id]);
        return goalRes.rows;
    }
    static async create({ u_id, type, category, seconds_per_day }) {
        const goalRes = await db.query(
            `INSERT INTO goals (u_id, type, category, seconds_per_day)
            VALUES($1, $2, $3, $4)
            RETURNING u_id, type, category, seconds_per_day`,
            [u_id, type, category, seconds_per_day]);

        return goalRes.rows[0];
    }
    static async update({ u_id, type, category }, seconds_per_day) {
        const goalRes = await db.query(
            `UPDATE goals 
            SET seconds_per_day = $1
            WHERE u_id = $2 AND type = $3 AND category =$4`,
            [seconds_per_day, u_id, type, category]);
        return goalRes.rows[0];
    }

    static async remove({ u_id, type, category }) {
        const goalRes = await db.query(
            `DELETE FROM goals 
            WHERE u_id = $1 AND type = $2 AND category =$3
            RETURNING category, type`,
            [u_id, type, category]);
        if (emptyResult(goalRes)) {
            throw {
                message: `There is no goal with the u_id='${u_id}', type='${type}', and category='${category}'`, status: 404
            }
        }
        return goalRes.rows[0];
    }
}
module.exports = Goal;