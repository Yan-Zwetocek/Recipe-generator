const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true },
  avatar: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  activationLink: { type: DataTypes.STRING },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});


const Comment = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  comment_text: { type: DataTypes.TEXT },
});

const Recipe = sequelize.define("recipe", {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  description: { type: DataTypes.TEXT },
  time_to_prepare: { type: DataTypes.INTEGER },
  recipe_img: { type: DataTypes.STRING, allowNull: true },
});

const RecipeSteps = sequelize.define("recipe_steps", {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  step_number: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  step_image: { type: DataTypes.STRING, allowNull: true },
});

const Ingredients = sequelize.define("ingredients", {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  calorie_content: { type: DataTypes.DECIMAL(10, 2) }, // 10 знаков всего, 2 после запятой
  protein_content: { type: DataTypes.DECIMAL(10, 2) },
  fat_content: { type: DataTypes.DECIMAL(10, 2) },
  carbohydrate_content: { type: DataTypes.DECIMAL(10, 2) },
  weight_in_grams: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

const DimensionUnits = sequelize.define("dimension_units", {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});


const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Cuisine = sequelize.define("cuisine", {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, allowNull: false },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

// Таблица для связи "Многие ко многим" между Recipe и Ingredients
const Recipe_ingredients = sequelize.define("recipe_ingredients", {
  quantity: { type: DataTypes.DECIMAL },
  dimension_unit_id: {
    type: DataTypes.INTEGER,
    references: {
      model: DimensionUnits,
      key: "id",
    },
    allowNull: false,
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Ingredients,
      key: "id",
    },
    allowNull: false,
  },
  notes: { type: DataTypes.TEXT, allowNull: true }, // Новое поле
});

// --- Ассоциации ---
// Пользователь и избранное


// Пользователь и комментарии
User.hasMany(Comment);
Comment.belongsTo(User);

// Пользователь и рецепты
User.hasMany(Recipe);
Recipe.belongsTo(User, { foreignKey: { allowNull: true } });

// Пользователь и рейтинг


// Рецепт и комментарии (при удалении рецепта удаляются комментарии)
Recipe.hasMany(Comment, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Comment.belongsTo(Recipe);



// Рецепт и категория
Recipe.belongsTo(Category);
Category.hasMany(Recipe);

// Рецепт и кухня
Recipe.belongsTo(Cuisine, { allowNull: false });
Cuisine.hasMany(Recipe, { allowNull: false });

// Рецепт и шаги
Recipe.hasMany(RecipeSteps, { foreignKey: "recipe_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
RecipeSteps.belongsTo(Recipe, { foreignKey: "recipe_id" });

// Связь "многие ко многим" между Recipe и Ingredients через Recipe_ingredients
Recipe.belongsToMany(Ingredients, { through: Recipe_ingredients, foreignKey: "recipe_id" });
Ingredients.belongsToMany(Recipe, { through: Recipe_ingredients, foreignKey: "ingredient_id" });

// Добавляем связь с единицей измерения
Recipe_ingredients.belongsTo(DimensionUnits, { foreignKey: "dimension_unit_id" });
DimensionUnits.hasMany(Recipe_ingredients);

Recipe_ingredients.belongsTo(Ingredients, {
  foreignKey: "ingredient_id",
  as: 'ingredient', // Добавил алиас, чтобы было удобнее обращаться к ингредиенту
});
Ingredients.hasMany(Recipe_ingredients, {
  foreignKey: "ingredient_id",
  as: 'recipeIngredients', // Добавил алиас
});

Recipe_ingredients.belongsTo(Recipe, {
  foreignKey: "recipe_id",
  as: 'recipe', // Добавил алиас
});
Recipe.hasMany(Recipe_ingredients, {
  foreignKey: "recipe_id",
  as: 'recipeIngredients', // Добавил алиас
});

module.exports = {
  User,
  Comment,
  Recipe,
  Ingredients,
  Recipe_ingredients,
  RecipeSteps,
  Cuisine,
  Category,
  DimensionUnits,
};
