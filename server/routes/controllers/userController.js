const ApiError = require("../../error/ApiError");
const userService = require("../../service/user-service");
const {User} = require('../../models/models');
const { validationResult } = require("express-validator");

class userController {
  async registration(req, res, next) {
    try {
    const {email, password, username, role}= req.body
    const errors= validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest('Ошибка при валидации', errors.array())); 
     }
    const avatar = req.files ? req.files.avatar : null
    const  userData=  await userService.registration(email, password, username, role, avatar ) 
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30* 24 * 60* 60 *1000, httOnly: true })
      return res.json(userData)
    } catch (e) {
      console.error("Ошибка при регистрации:", e);
      next(ApiError.badRequest(e.message));
      
    }
  }

  async login(req, res, next) {
    try {
      const {email, password,}= req.body
      const userData=userService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30* 24 * 60* 60 *1000, httOnly: true })
      return res.json(userData)
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async logout(req, res, next) {
    try {
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink= req.params.link
      await userService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URl)
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async refresh(req, res, next) {
    try {
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getUsers(req, res, next) {
    try {
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
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
