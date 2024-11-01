const ApiError = require("../error/ApiError");
const tokenService = require("../service/token-service");
const userService = require("../service/user-service"); // Импортируем userService

module.exports = function (role) {
  return async function (req, res, next) { // Делаем функцию асинхронной
    if (req.method === "OPTIONS") {
      return next(); // Завершаем выполнение функции после вызова next
    }
    
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return next(ApiError.unauthorized('Отсутствует заголовок авторизации'));
      }

      const accessToken = authorizationHeader.split(" ")[1];
      if (!accessToken) {
        return next(ApiError.unauthorized('Неверный формат токена авторизации'));
      }

      const userData = tokenService.validateAccessToken(accessToken);
      if (!userData) {
        return next(ApiError.unauthorized('Токен недействителен'));
      }

      // Получаем информацию о пользователе из userService
      const user = await userService.getUserById(userData.id); 
      if (!user) {
        return next(ApiError.unauthorized('Пользователь не найден'));
      }

      if (user.role !== role) {
        return next(ApiError.forbidden(`У вас нет доступа. Вы ${user.role}, а должны быть ${role}`)); // Используем шаблонные строки
      }

      req.user = user; 
      next();
    } catch (e) {
      return next(ApiError.unauthorized(e.message));
    } 
  };
};
