const { Cuisine } = require("../../models/models");
const ApiError = require("../../error/ApiError");

class cuisineRouterController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const cuisine = await Cuisine.create({ name });
      return res.json(cuisine);
    } catch (e) {
      next(ApiError.badRequest(e.massage));
    }
  }
  async getAll(req, res, next) {
    try {
      const cuisines = await Cuisine.findAll();
      return res.json(cuisines);
    } catch (e) {
      next(ApiError.badRequest(e.massage));
    }
  }
  async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      const cuisine = Cuisine.destroy({ where: { id } });
      return res.json(cuisine);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const [updated] = await Cuisine.update({ name }, { where: { id } });

      if (!updated) {
        return res.status(404).json({ message: "Cuisine not found" });
      }

      const updatedCuisine = await Cuisine.findByPk(id);

      return res.json(updatedCuisine);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new cuisineRouterController();
