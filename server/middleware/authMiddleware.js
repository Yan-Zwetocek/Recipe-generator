
const ApiError = require("../error/ApiError");
const tokenService = require("../service/token-service");
module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.Unauthorized(' Пользователь не авторизован  '));
    }

    const accessToken = authorizationHeader.split(" ")[1];

    if (!accessToken) {
      return next(ApiError.Unauthorized(' Пользователь не авторизован  '));
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.Unauthorized(' Пользователь не авторизован  '));
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.Unauthorized(' Пользователь не авторизован  '));
  }
};
