export interface AppError {
  statusCode: number;
  message: string;
  isOperational: boolean;
  type: string;
  stack?: string;
}

export const createError = (
  statusCode: number,
  message: string,
  type: string,
  isOperational = true
): AppError => ({
  statusCode,
  message,
  type,
  isOperational,
  stack: Error().stack,
});

export const createNotFoundError = (message = "Resource not found"): AppError =>
  createError(404, message, "NotFoundError");

export const createValidationError = (message: string): AppError =>
  createError(400, message, "ValidationError");

export const createUnauthorizedError = (
  message = "Unauthorized access"
): AppError => createError(401, message, "UnauthorizedError");

export const createForbiddenError = (message = "Forbidden access"): AppError =>
  createError(403, message, "ForbiddenError");

export const createDatabaseError = (
  message = "Database error occurred"
): AppError => createError(500, message, "DatabaseError");

export const createDuplicateError = (message = "Duplicate entry"): AppError =>
  createError(409, message, "DuplicateError");

export const isAppError = (error: unknown): error is AppError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    "message" in error &&
    "type" in error &&
    "isOperational" in error
  );
};
