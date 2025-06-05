import { Request, Response } from "express";
import { isAppError, AppError, createDatabaseError } from "../utils/errors";
import { MongoError } from "mongodb";
import { Error as MongooseError } from "mongoose";

interface ErrorResponse {
  status: string;
  message: string;
  errorType?: string;
  stack?: string;
}

const handleMongoError = (err: MongoError): AppError => {
  if (err.code === 11000) {
    return createDatabaseError("Duplicate field value entered");
  }
  return createDatabaseError();
};

const handleValidationError = (
  err: MongooseError.ValidationError
): AppError => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return createDatabaseError(`Invalid input data. ${errors.join(". ")}`);
};

export const errorHandler = (
  err: Error | AppError | MongoError,
  req: Request,
  res: Response
): void => {
  const isDev = process.env.NODE_ENV === "development";

  let error: AppError;

  if (err instanceof MongoError) {
    error = handleMongoError(err);
  } else if (err instanceof MongooseError.ValidationError) {
    error = handleValidationError(err);
  } else if (isAppError(err)) {
    error = err;
  } else {
    error = createDatabaseError(err.message);
  }

  const response: ErrorResponse = {
    status: error.statusCode >= 500 ? "error" : "fail",
    message: error.message,
    errorType: error.type,
  };

  if (isDev) {
    response.stack = error.stack;
  }

  res.status(error.statusCode).json(response);
};
