/** User class for message.ly */
const db = require("../db");
const ExpressError = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");
const bcrypt = require("bcrypt");

const Shift = require("./Shift");


const noResult = dbResult => dbResult ? dbResult.rowCount === 0 : false;
const noSuchUserError = username => new ExpressError(`no such user: ${username}`, 404);

/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password}) { 
      const hashed = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
      const result = await db.query(
          `INSERT INTO 
          users(username, password, join_at, last_login_at)
          VALUES($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
          RETURNING u_id, username, join_at`,
          [username, hashed]);

      return result.rows[0];
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { 
      const result = await db.query(`
        SELECT password FROM users 
        WHERE username=$1`, 
        [username]);
      if (noResult(result)) return false;
      else return bcrypt.compare(password, result.rows[0].password);
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { 
      const result = await db.query(`
        UPDATE users 
        SET last_login_at=current_timestamp 
        WHERE username=$1
        RETURNING last_login_at`,
        [username]);
      if (noResult(result)) throw noSuchUserError(username);
  }

  /** All: basic info on all users:
   * #TODO DOUBLE CHECK THIS IS CORRECT!
   * [{username, last_login_at}, ...] */

  static async all() { 
      const result = await db.query(`
      SELECT username, last_login_at 
      FROM users`);

      return result.rows;
  }

  /** Get: get user by username
   *
   * returns {u_id,
   *          username,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
      const result = await db.query(`
      SELECT u_id, username, join_at, last_login_at 
      FROM users
      WHERE username=$1`,
      [username]);
      if (noResult(result)) throw noSuchUserError(username);
      return result.rows[0];
  }

  static async addShift(u_id, shift) {
    shift.u_id = u_id;
    const shift = await Shift.create(shift);
    return shift;
  }

  static async getAllShifts(u_id) {
    return await Shift.getAllByUser(u_id);
  }
  static async getShift(shiftId, u_id=0) {
    const shift = await Shift.get(shiftId);
    if(u_id !== 0) {
      if(shift['u_id'] !== u_id) return false;
    }
    return shift;
  }
} 

module.exports = User;