const ApiError = require("../../error/ApiError");
const userService = require("../../service/user-service");
const { User } = require("../../models/models");
const { validationResult } = require("express-validator");

class userController {
  async registration(req, res, next) {
    try {
      const { email, password, username, role } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.badRequest("Ошибка при валидации", errors.array())
        );
      }
      const avatar = req.files ? req.files.avatar : null;
      const userData = await userService.registration(
        email,
        password,
        username,
        role,
        avatar
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.error("Ошибка при регистрации:", e);
      next(ApiError.badRequest(e.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json({ message: "Успешный выход " });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URl);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
    const  userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.error("Ошибка при обновлении:", e.message)
      next(ApiError.badRequest(e));
    }
  }
   async getUserById(req, res, next){
     
     const {id} = req.params 
    try {
      const user = await User.findByPk(id, {
        attributes: [ 'id','username', 'role', 'avatar' ],  // Укажите здесь нужные колонки
     });
     
    
      if (!user) {
       return res.status(404).json({ error: "User not found" });
      }
    
      return res.json(user);
     } catch (e) {
      console.error("Error in getUserById:", e);
      next(ApiError.badRequest(e.message));
     }
    }
   
  async updateUser(req, res, next) {
    try {
      const { username } = req.body;
      const {avatar}= req.files
      const { id } = req.params;
      const userData = await userService.update(id, username, avatar);
      return res.json(userData);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new userController();
