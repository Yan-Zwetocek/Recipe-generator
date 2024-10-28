class ApiError extends Error {
  constructor(status, message, errors = []) {
    super();
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
  static badRequest(message, error = []) {
    return new ApiError(404, message, error);
  }
  static internal(message, errors = []) {
    return new ApiError(500, message, errors);
  }
  static forbidden(message, errors = []) {
    return new ApiError(403, message, errors);
  }
  static Unauthorized(message, errors = []) {
    return new ApiError(401, message, errors);
  }
}
module.exports = ApiError;
