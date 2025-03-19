const { Ingredients } = require("../../models/models");
const ApiError = require("../../error/ApiError");

class ingredientController {
  async ingredientCreate(req, res, next) {
    try {
      const { name,  calories, fat, carbs, protein, weight } = req.body;
      const ingredient = Ingredients.create({
        name, 
        calorie_content: calories,
        fat_content :fat, 
        carbohydrate_content : carbs, 
        protein_content: protein,
        weight_in_grams : weight

      });
      return res.json(ingredient);
    } catch (e) {
      next(ApiError.badRequest(e.massage));
    }
  }

  async getAllIngredients(req, res) {
    try {
      const ingredients = await Ingredients.findAll();
      return res.json(ingredients);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async deleteIngredientById(req, res) {
    try {
      const { id } = req.params;
      const ingredient = Ingredients.destroy({ where: { id } });
      return res.json(ingredient);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async updateIngredientById(req, res) {
    try {
      const { name, dimension_units, calories } = req.body;
      const { id } = req.params;
      const [updated] = Ingredients.update(
        { name, dimension_units, calorie_content: calories },
        { where: { id } }
      );
      if (!updated) {
        return res.status(404).json({ message: "Ingredients not found" });
      }
      const updatedIngredients = await Cuisine.findByPk(id);

      return res.json(updatedIngredients);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ingredientController();
