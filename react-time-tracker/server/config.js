/** Common config for timetracker server. */
// read .env files and make environmental variables

const ENV = require("dotenv").config();
console.log('process.env', process.env);
console.log('ENV', ENV);
let DB_URI = process.env.DB_BASE_URI || "postgresql://";

if (process.env.NODE_ENV === "test") {
    DB_URI = `${DB_URI}/books_test`;
} else {
    DB_URI = process.env.DATABASE_URL || `${DB_URI}/timetracker`;
}


module.exports = { DB_URI };