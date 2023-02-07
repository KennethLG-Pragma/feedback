export class InvalidDataError extends Error {
  constructor(public readonly message: string) {
    super(message)
  }
}
