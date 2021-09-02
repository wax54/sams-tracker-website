const express = require("express");

const ExpressError = require("../expressError");
const jsonschema = require("jsonschema");
// const Book = require("../models/book");

const newShiftSchema = require("../schemas/newShiftValidation.json");
const editShiftSchema = { ...newShiftSchema, "required": [] };
const Shift = require('../models/Shift');
const User = require('../models/User');
const { ensureLoggedIn } = require("../middleware/auth");
const { ForbiddenError, UnauthorizedError } = require("../defaultErrors");

const router = new express.Router();

/** GET / => {shifts: [shift, ...]}  */

router.get("/", async function (req, res, next) {
    try {
        const page = req.query.page || 0; 
        const shifts = await Shift.getAll(page, 25);
        return res.json({ shifts });
    } catch (err) {
        return next(err);
    }
});

/** GET /[id]  => {shift: shift} */

router.get("/:id", async function (req, res, next) {
    try {
        const shift = await Shift.get(req.params.id);
        return res.json({ shift });
    } catch (err) {
        return next(err);
    }
});

/** POST /   {shift: shiftData} => {shift: newShift}  */

router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const shiftData = req.body.shift;
        validateInput(shiftData, newShiftSchema);
        const shift = await User.addShift(res.locals.user.id, shiftData);
        return res.status(201).json({ shift });

    } catch (err) {
        return next(err);
    }
});

/** PATCH /[id]   shiftData => {shift: updatedShift}  */

router.patch("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const shiftId = +req.params.id;
        const shift = await Shift.get(shiftId);
        //not Authorized to edit this shift
        if(shift['u_id'] !== res.locals.user.id) throw new UnauthorizedError();
        const updatedShiftData = req.body.shift;
        validateInput(updatedShiftData, editShiftSchema);
        const updatedShift = await Shift.update(shiftId, updatedShiftData);
        return res.json({ shift: updatedShift });

    } catch (err) {
        return next(err);
    }
});

/** DELETE /shifts/[id]   => {message: "Shift deleted"} */

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const id = req.params.id;
        const shift = await Shift.get(id);
        console.log('VALID?',res.locals.user.id, shift.u_id);
        //not Authorized to edit this shift
        if (shift['u_id'] !== res.locals.user.id) throw new UnauthorizedError();
        await Shift.remove(id);
        return res.status(204).json({ status: 204, message: "Shift Deleted" });
    } catch (err) {
        return next(err);
    }
});

const validateInput = (data, schema) => {
    const verify = jsonschema.validate(data, schema);
    if (!verify.valid) {
        const errors = verify.errors.map(e => e.stack);
        throw new ExpressError(errors, 400);
    }
    else {
        return true;
    }
};
module.exports = router