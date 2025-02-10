const tokenModel = require("../models/tokenModels");
const jwt = require("jsonwebtoken");
class tokenService {
  generationToken(payLoad) {
    const accessToken = jwt.sign(payLoad, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payLoad, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.RefreshToken.findOne({
      where: { userId },
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await tokenModel.RefreshToken.create({
      userId,
      refreshToken,
    });

    return token;
  }
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      console.error('ошибка верификации ',token)
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      console.error('ошибка верификации ',e)
      return null;
    }
  }
  async removeToken(refreshToken) {
    const tokenData = await tokenModel.RefreshToken.destroy({
      where: { refreshToken },
    });
    return tokenData;
  }
  async findToken(refreshToken) {
    console.log('Ищем токен в базе данных:', refreshToken);
    const tokenData = await tokenModel.RefreshToken.findOne({});
    if (!tokenData) {
      console.log('Токен не найден.');
    }
    return tokenData;
  }
  
}

module.exports = new tokenService();
