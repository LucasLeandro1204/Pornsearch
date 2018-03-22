class OverwriteError extends Error {
  constructor () {
    super('This function must be overwrite.');
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default OverwriteError;
