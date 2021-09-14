"use strict";

/** Convenience middleware to handle common auth cases in routes. */
const { UnauthorizedError } = require("../defaultErrors");
const { verifyToken } = require("../helpers");


/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
  res.locals.user = verifyToken(req.headers.authorization);
  next();
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    if (res.locals.user === false) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}


// /** Middleware to use when a user is trying to access information about themselves
//  *        must themselves to view
//  *
//  * If not, raises Unauthorized.
//  */

// function ensureIsAdminOrSelf(req, res, next) {
//   try {
//     const user = res.locals.user;
//     if (!user) throw new UnauthorizedError();
//     const uname = req.params.username;

//     if ((user.username !== uname) && !user.isAdmin) throw new UnauthorizedError();
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// }

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
};
