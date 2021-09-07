/** Common config for timetracker server. */
// read .env files and make environmental variables

const ENV = require("dotenv").config().parsed;

let DB_URI = ENV.DB_BASE_URI || "postgresql://";
if (process.env.NODE_ENV === "test") {
    DB_URI = `${DB_URI}/time_tracker_test`;
} else {
    DB_URI = process.env.DATABASE_URL || `${DB_URI}/time_tracker`;
}
//production setting
let PORT;
if (process.env.NODE_ENV !== "production") {
    PORT = 5000;
} else {
    PORT = ENV.PORT || 3000;
}

const BCRYPT_WORK_FACTOR = 12;

const SECRET_KEY = ENV.SECRET_KEY || "SUPER SECRET TEST KEY";

module.exports = { DB_URI, BCRYPT_WORK_FACTOR, SECRET_KEY, PORT };