const express = require("express");

const ExpressError = require("../expressError");
// const jsonschema = require("jsonschema");

// const newShiftSchema = require("../schemas/newShiftValidation.json");
// // const editShiftSchema = { ...newShiftSchema, "required": [] };

const { makeToken } = require("../helpers");
const { ensureLoggedIn } = require("../middleware/auth");
const User = require('../models/User');
const Goal = require('../models/Goal');

const router = new express.Router();

/** POST /login {username, password} => {user: {u_id, username, join_at, last_login_at}}  */

router.post("/login", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        console.log(req.body);

        const valid_user = await User.authenticate({username, password});
        if(valid_user) {
            const user = await User.get(username);
            const token = makeToken({id: user.id});
            res.json({ user, token });
            await User.updateLoginTimestamp(username);
        } else {
            throw new ExpressError(`Invalid Credentials!`, 401);
        }
    } catch (err) {
        return next(err);
    }
});

/** POST /register {username, password} => {user: {u_id, username, join_at, last_login_at}}  */

router.post("/register", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.register({username, password});
        const token = makeToken({ id: user.id });
        return res.json({ user, token });
    } catch (err) {
        if (err.code === "23505") return next(new ExpressError(`Username Already Exists!`, 409));
        return next(err);
    }
});

router.get("/shifts", ensureLoggedIn, async function (req, res, next) {
    try {
        const page = req.query.page || 0;
        const shifts = await User.getAllShifts(res.locals.user.id, page);
        return res.json({ shifts });
    } catch (err) {
        return next(err);
    }
});

router.get("/goals", ensureLoggedIn, async function (req, res, next) {
    try {
        const goals = await Goal.getAll(res.locals.user.id);
        console.log(goals);
        return res.json({ goals });
    } catch (err) {
        return next(err);
    }
});
module.exports = router;