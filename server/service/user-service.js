const { User, Favourites } = require("../models/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/userDto");
const path = require("path");
const { error } = require("console");

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

    await avatar.mv(
      path.resolve(__dirname, "../", "static", "avatars", fileName)
    );

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
    console.log(userDto);
    await mailService.sendActivationLink(
      email,
    `${process.env.API_URL}/user/activate/${activationLink}`
    );
    const tokens = tokenService.generationToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async activate(activationLink) {
    const user = await User.findOne({ where: {activationLink: activationLink } });
    if (!user) {
      throw new Error(" Не корректная ссылка активации");
    }
    user.isActivated= true
    await user.save()
  }
}

module.exports = new userService();
