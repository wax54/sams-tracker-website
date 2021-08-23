const express = require("express");
const ExpressError = require("./expressError");
const path = require("path");

const api = require("./api/Shifts");

const app = express();
// app.use(express.json());

//handles react app homepage load 
app.use('/api', api);

//handles react app homepage load 
app.use('/',express.static(path.join(__dirname, "..", "build")));

//serves ./public directory
app.use('/',express.static("public"));

//handles other route loads, should be catch all for other routes instead of 404
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// //404 Handler
// app.use(function (req, res, next) {
//     const err = new ExpressError("Not Found", 404);
//     return next(err);
// });

/** general error handler */
app.use((err, req, res, next) => {
    status = err.status || 500;

    if (process.env.NODE_ENV != 'test')
        console.error(err.stack);
    if (status == 500)
        console.log(err);

    res.status(status);
    return res.json({
        error: err,
        message: err.message
    });
});


module.exports = app;