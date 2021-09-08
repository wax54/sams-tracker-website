/** Database config for database. */

const { Client } = require("pg");
const { DB_URI } = require("./config");

let db = new Client({
    connectionString: DB_URI,
    //unfortunately neccessay for Heroku
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect();


module.exports = db;
