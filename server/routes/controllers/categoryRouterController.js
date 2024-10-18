const { Category } = require("../../models/models");
const ApiError = require("../../error/ApiError");

class categoryRouterController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      return res.json(category);
    } catch (e) {
      next(ApiError.badRequest(e.massage));
    }
  }
  async getAll(req, res, next) {
    try {
      const category = await Category.findAll();
      return res.json(category);
    } catch (e) {
      next(ApiError.badRequest(e.massage));
    }
  }
  async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      const category = Category.destroy({ where: { id } });
      return res.json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const [updated] = await Category.update({ name }, { where: { id } });

      if (!updated) {
        return res.status(404).json({ message: "Category not found" });
      }

      const updatedCuisine = await Category.findByPk(id);

      return res.json(updatedCuisine);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new categoryRouterController();
