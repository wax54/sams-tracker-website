const express = require("express");
const ExpressError = require("./expressError");
const path = require("path");

const shiftsApi = require("./api/shifts");
const goalsApi = require("./api/goals");
const usersApi = require("./api/users");
const { authenticateJWT } = require("./middleware/auth");

const app = express();

//handles API requests first
app.use(express.json());
// app.use(express.urlencoded());

app.use(authenticateJWT);
//pass CORS perflight policies when cross origin during dev
if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.set('Access-Control-Allow-Headers', 'Content-type, Authorization');
        res.set('Access-Control-Allow-Methods', '*');
        // res.set('Content-Type', 'text/html');
        next();
    });
}
app.use('/api/shifts', shiftsApi);
app.use('/api/users', usersApi);
app.use('/api/goals', goalsApi);


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