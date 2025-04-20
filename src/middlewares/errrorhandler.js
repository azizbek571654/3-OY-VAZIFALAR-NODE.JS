export const errorHandler = ( error, req, res, next) => {
    if(error){
        const statusCode = error.statusCode || 500;
        const message = error.message || "internal server error";
        res.status(statusCode).json({
            status:"error",
            message: message,
            data: null,
            error:error.stack
        });
    }
}

export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.name = 'Custom Error'
        this.statusCode = statusCode
        Error.captureStackTrace(this)
    }
}