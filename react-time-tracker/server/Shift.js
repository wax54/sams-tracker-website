const db = require("./db");

const emptyResult = res => res.rows.length === 0;

/** Collection of related methods for shifts. */

class Shift {
    /** given an id, return shift data with that id:
     *
     * => {id, start, stop, category, type}
     *
     **/

    static async findOne(id) {
        const shiftRes = await db.query(
            `SELECT id, start, stop, category, type
            FROM shifts 
            WHERE id = $1`, [id]);

        if (emptyResult(shiftRes)) {
            throw { message: `There is no shift with the id '${id}`, status: 404 }
        }

        return shiftRes.rows[0];
    }

    /** Return array of shift data:
     *
     * => [ {isbn, amazon_url, author, language,
     *       pages, publisher, title, year}, ... ]
     *
     * */

    static async findAll(limit=25, page=0) {
        const shiftsRes = await db.query(
            `SELECT id, start, stop, category, type
            FROM shifts
            ORDER BY start
            LIMIT $1
            OFFSET $2`, [limit, page*limit]);
        return shiftsRes.rows;
    }

    /** create shift in database from data, return shift data:
     *
     * {start, stop, category, type}
     *
     * => {id, start, stop, category, type}
     *
     * */

    static async create(data) {
        if(!data.stop){
            data.stop = null;
        }
        const result = await db.query(
            `INSERT INTO shifts 
            (start, stop, category, type) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id, start, stop, category, type`
            ,[data.start, data.stop, data.category, data.type]
        );
        return result.rows[0];
    }

    /** Update data with matching ID to data, return updated shift.
  
     * id, {start || stop || category || type }
     *
     * => {id, start, stop, category, type}
     *
     * */

    static async update(id, data) {
        const shift = await Shift.findOne(id);
        if(data.id)
            delete data.id
        data = { ...shift, ...data };
        const result = await db.query(
            `UPDATE shifts SET 
            start=($1),
            stop=($2),
            category=($3),
            type=($4)
            WHERE id=$5
        RETURNING id, start, stop, category, type`,
            [
                data.start, data.stop, data.category, data.type, id
            ]
        );

        if (emptyResult(result)) {
            throw { message: `There is no shift with an id '${id}`, status: 404 }
        }

        return result.rows[0];
    }

    /** remove shift with matching id. Returns undefined. */

    static async remove(id) {
        const result = await db.query(
            `DELETE FROM shifts 
         WHERE id = $1 
         RETURNING id`,
            [id]);

        if (emptyResult(result)) {
            throw { message: `There is no shift with an id '${id}`, status: 404 }
        }
    }
}


module.exports = Shift;
