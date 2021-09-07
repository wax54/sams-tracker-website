const ExpressError = require("./expressError");
/** 404 NOT FOUND error. */

class NotFoundError extends ExpressError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}

/** 401 UNAUTHORIZED error. */

class UnauthorizedError extends ExpressError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

/** 400 BAD REQUEST error. */

class BadRequestError extends ExpressError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

/** 403 Forbidden error. */

class ForbiddenError extends ExpressError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}

module.exports = {
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError,
};