const express = require("express");

const ExpressError = require("../expressError");
const jsonschema = require("jsonschema");
// const Book = require("../models/book");

const newGoalSchema = require("../schemas/newGoalValidation.json");
const editGoalSchema = require("../schemas/editGoalValidation.json");
const Goal = require('../models/Goal');
const { ensureLoggedIn } = require("../middleware/auth");
const { ForbiddenError, UnauthorizedError } = require("../defaultErrors");

const router = new express.Router();
router.use(ensureLoggedIn);

router.get("/", async function (req, res, next) {
    try {
        const goals = await Goal.getAll(res.locals.user.id);
        return res.json({ goals });
    } catch (err) {
        return next(err);
    }
});

/**
 * post /goals/ goal:{ type, category, seconds_per_day } 
 *                  =>  {goal: {type, category, seconds_per_day, u_id}}
 */
router.post("/", async function (req, res, next) {
    try {
        const {type, category, seconds_per_day} = req.body.goal;
        const u_id = res.locals.user.id;
        const goalData = {type, category, seconds_per_day, u_id};
        validateInput(goalData, newGoalSchema);
        const goal = await Goal.create(goalData);
        return res.json({ goal });
    } catch (err) {
        return next(err);
    }
});

/**
 * patch /goals/:category/:type goal:{ seconds_per_day } 
 *                  =>  {goal: {type, category, seconds_per_day, u_id}}
 */
router.patch("/:category/:type", async function (req, res, next) {
    try {
        const { type, category } = req.params;
        const updatedSeconds = req.body.goal;
        const u_id = res.locals.user.id;
        validateInput(updatedSeconds, editGoalSchema);
        const goal = await Goal.update({ type, category, u_id }, updatedSeconds);
        return res.json({ goal });
    } catch (err) {
        return next(err);
    }
});

/**
 * delete /goals/:category/:type  
 *                  =>  {deleted: true} or {deleted: false}
 */
router.delete("/:category/:type", async function (req, res, next) {
    try {
        const { type, category } = req.params;
        const u_id = res.locals.user.id;
        await Goal.remove({ type, category, u_id });
        return res.json({ deleted: true });
    } catch (err) {
        return res.json({ deleted: false });
    }
});


module.exports = router;