const sequelize = require("../db");
const {User} = require('./models')
const { DataTypes } = require('sequelize');

const RefreshToken = sequelize.define('refreshToken', {
 refreshToken: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
 },
 userId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
   model: 'users',
   key: 'id',
  },
 },
 
});

User.hasMany(RefreshToken, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
   });
   RefreshToken.belongsTo(User, { foreignKey: 'userId' });
   
   module.exports = { 
    User,
    RefreshToken
   };