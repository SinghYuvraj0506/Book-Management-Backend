
import { ApiError } from "../utils/ApiError.js";

export const ErrorMiddleware = (err,req,res,next) => {
    err.statusCode = err?.statusCode || 500
    err.message = err.message || "Internal Server Error"

    // checking the types of error-----------
    if(err?.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ApiError(400,message)
    }

    // Duplicate key Error ---------
    else if(err?.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ApiError(400,message)
    }

    console.log(err)

    return res.status(err?.statusCode).json({
        success:false,
        message : err.message
    })

}

