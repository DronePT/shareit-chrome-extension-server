export class HttpError extends Error {
  httpCode: number;

  constructor(message: string, code = 400) {
    super(message);

    this.httpCode = code;
    this.name = this.constructor.name;
  }
}
