import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason: string = "Error connecting to database";
  statusCode: number = 500;

  constructor() {
    super("Error connecting to database");
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
