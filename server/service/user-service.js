const { User, Favourites } = require("../models/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/userDto");
const path = require("path");
const ApiError = require("../error/ApiError");

class userService {
  async registration(email, password, username, role, avatar) {
    const candidate = await User.findOne({ where: { username } });
    if (candidate) {
      throw new Error(`User with ${username} already exist`);
    }
    const emailCandidate = await User.findOne({ where: { email } });
    if (emailCandidate) {
      throw new Error(`User with ${email} already exist`);
    }

    let fileName = uuid.v4() + ".jpg";

    if (avatar) {
      await avatar.mv(
        path.resolve(__dirname, "../", "static", "avatars", fileName)
      );
    } else fileName = null;

    const activationLink = uuid.v4();
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({
      email,
      role: role,
      password: hashPassword,
      activationLink,
      username,
      avatar: fileName,
    });

    const favourites = await Favourites.create({ userId: user.id });
    const userDto = new UserDto(user);
    await mailService.sendActivationLink(
      email,
      `${process.env.API_URL}/user/activate/${activationLink}`
    );
    const tokens = tokenService.generationToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async activate(activationLink) {
    const user = await User.findOne({
      where: { activationLink: activationLink },
    });
    if (!user) {
      throw new Error(" Не корректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.badRequest("Пользователь не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.badRequest("Не верный пароль ");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generationToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized();
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.unauthorized();
    }
    const user = await User.findOne({ where: { id } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generationToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async update(userId, username, avatar) {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw ApiError.badRequest("Пользователь не найден");
    }

    let fileName = user.avatar;
    if (avatar) {
      fileName = uuid.v4() + ".jpg";
      await avatar.mv(
        path.resolve(__dirname, "../", "static", "avatars", fileName)
      );
    }

    await user.update({
      username,
      avatar: fileName,
    });

    return { message: "Данные изменены" };
  }
  async getUserById(id) {
    const user = await User.findOne({ where: { id } }); // Находим пользователя по ID
    return user;
  }
}

module.exports = new userService();
