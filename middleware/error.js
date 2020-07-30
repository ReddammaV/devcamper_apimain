const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    // spread operator
    let error = { ...err }
    error.message = err.message;

    // log console for dev
    console.log(err);

    // Mongoose bad objectId
    if (err.name === 'CastError') {
        const message = `Bootcamp not found id of ${err.value}`;
        error = new ErrorResponse(message, 404)
    }

    // Mongoose duplicate key -for create bootcamps if same name is there 
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error - If Fields are not entered in create fields (ex: bootcamp)
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    // statusCode form utils/errorResponse
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler;