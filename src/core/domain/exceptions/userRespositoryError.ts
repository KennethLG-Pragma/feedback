export class UserRepositoryError extends Error {
  constructor(public readonly message: string) {
    super(message)
  }
}
