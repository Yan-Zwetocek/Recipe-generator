const ApiError = require("../../error/ApiError");

class userController {
  async registration(req, res) {
    // Логика для регистрации
  }

  async login(req, res) {
    // Логика для входа
  }

  async authCheck(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("No ID"));
    }
    res.json(id);
  }
}

module.exports = new userController();
