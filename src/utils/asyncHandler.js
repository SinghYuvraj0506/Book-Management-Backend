
// HOF to handle all the promises and all catch the errors -----------------
export const asyncHandler = (requestHandler) => (req,res,next) => (
    Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
)