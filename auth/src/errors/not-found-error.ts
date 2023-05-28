import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;

  constructor() {
    super("route not found");
  }

  serializeErrors(): { message: string }[] {
    return [
      {
        message: "Not Found",
      },
    ];
  }
}
