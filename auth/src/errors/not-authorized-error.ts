import { CustomError } from "./custom-error";

export class NotAuthroziedError extends CustomError {
  statusCode: number = 401;

  constructor() {
    super("Not authorized");
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: "Not authorized",
      },
    ];
  }
}
