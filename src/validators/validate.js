import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

export const validate = (req, res, next) => {

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  throw new ApiError(422, errors?.array()[0]?.msg ?? "Received data is not valid");
};
