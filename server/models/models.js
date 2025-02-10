const sequelize = require("../db");
const { DataTypes, STRING } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  username: { type: DataTypes.STRING, unique: true },
  avatar: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  activationLink: { type: DataTypes.STRING },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});


const Favourites = sequelize.define("favourites", {});

const Comment = sequelize.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  comment_text: { type: DataTypes.TEXT },
  
});

const Recipe = sequelize.define("recipe", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, unique: true },
  description: { type: DataTypes.TEXT },
  time_to_prepare: { type: DataTypes.INTEGER },
  rating: { type: DataTypes.INTEGER },
  recipe_img: { type: DataTypes.STRING, allowNull: true },

});
const RecipeSteps = sequelize.define("recipe_steps", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },

  step_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  step_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});



const Ingredients = sequelize.define("ingredients", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  dimension_units: { type: DataTypes.STRING, allowNull: false }, // Единицы измерения
  calorie_content: { type: DataTypes.DECIMAL },
  protein_content: { type: DataTypes.DECIMAL }, // Содержание белка
  fat_content: { type: DataTypes.DECIMAL },     // Содержание жира
  carbohydrate_content: { type: DataTypes.DECIMAL }, // Содержание углеводов
});


const Rating = sequelize.define("rating", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  rate: { type: DataTypes.INTEGER },
});

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

const Cuisine = sequelize.define("cuisine", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

const Recipe_ingredients = sequelize.define("recipe_ingredients", {
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'recipe', // Модель, на которую ссылается внешний ключ
      key: 'id',     // Поле, на которое ссылается внешний ключ
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false,
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ingredients', // Модель, на которую ссылается внешний ключ
      key: 'id',          // Поле, на которое ссылается внешний ключ
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false,
  },
  quantity: { type: DataTypes.DECIMAL },
});



// Ассоциации
User.hasOne(Favourites);
Favourites.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Recipe);
Recipe.belongsTo(User, { foreignKey: { allowNull: true } });

User.hasMany(Rating);
Rating.belongsTo(User);

// Каскадное удаление комментариев при удалении рецепта
Recipe.hasMany(Comment, {
  onDelete: 'CASCADE',   // При удалении рецепта, все связанные комментарии будут удалены
  onUpdate: 'CASCADE',   // Обновления рецепта будут каскадироваться
});
Comment.belongsTo(Recipe);

// Каскадное удаление рейтингов при удалении рецепта
Recipe.hasMany(Rating, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Rating.belongsTo(Recipe);

Recipe.belongsTo(Category);
Category.hasMany(Recipe);

Recipe.belongsTo(Cuisine, { allowNull: false });
Cuisine.hasMany(Recipe, { allowNull: false });

// Каскадное удаление шагов рецепта при удалении рецепта
Recipe.hasMany(RecipeSteps, {
  foreignKey: "recipe_id",
  onDelete: 'CASCADE',   // При удалении рецепта, все связанные шаги рецепта будут удалены
  onUpdate: 'CASCADE',
});
RecipeSteps.belongsTo(Recipe, { foreignKey: "recipe_id" });

// Связь многие ко многим между Recipe и Ingredients через Recipe_ingredients
Recipe.belongsToMany(Ingredients, { through: Recipe_ingredients, foreignKey: 'recipe_id' });
Ingredients.belongsToMany(Recipe, { through: Recipe_ingredients, foreignKey: 'ingredient_id' });


module.exports = {
  User,
  Favourites,
  Comment,
  Recipe,
  Ingredients,
  Recipe_ingredients,
  Rating,
  RecipeSteps,
  Cuisine,
  Category,
};
