const express = require("express");

const ExpressError = require("../expressError");
// const jsonschema = require("jsonschema");

// const newShiftSchema = require("../schemas/newShiftValidation.json");
// // const editShiftSchema = { ...newShiftSchema, "required": [] };
const User = require('../models/User');

const router = new express.Router();

/** GET /login {username, password} => {user: {u_id, username, join_at, last_login_at}}  */

router.get("/login", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const valid_user = await User.authenticate(username, password);
        if(valid_user) {
            const user = await User.get(username);
            res.json({ user });
            await User.updateLoginTimestamp(username);
        } else {
            throw new ExpressError(`Invalid Credentials!`, 401);
        }
    } catch (err) {
        return next(err);
    }
});

/** POST /register {username, password} => {user: {u_id, username, join_at, last_login_at}}  */

router.get("/register", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.register(username, password);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;