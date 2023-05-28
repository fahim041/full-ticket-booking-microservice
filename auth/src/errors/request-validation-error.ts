import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode: number = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid Request");
  }

  serializeErrors() {
    return this.errors.map((err: ValidationError) => {
      return {
        message: err.msg,
        field: err.type === "field" ? err.path : err.type,
      };
    });
  }
}
