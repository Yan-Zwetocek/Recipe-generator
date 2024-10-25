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
}

module.exports = new tokenService();
