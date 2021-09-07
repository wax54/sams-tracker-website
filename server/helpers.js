const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");

/** return signed JWT from user data. */
function makeToken(user) {
    let payload = { id: user.id };

    return jwt.sign(payload, SECRET_KEY);
}

/** return user data if valid token. false if not*/
function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (e) {
        return false;
    }
}

module.exports = { makeToken, verifyToken }