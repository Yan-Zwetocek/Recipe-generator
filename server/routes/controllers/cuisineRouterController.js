const { Cuisine } = require("../../models/models");
const ApiError = require("../../error/ApiError");

class cuisineRouterController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
  
      // Проверка: name должно существовать и быть строкой
      if (!name || typeof name !== 'string' || name.trim() === '') {
        return next(ApiError.badRequest('Название кухни (name) обязательно и должно быть строкой.'));
      }
  
      // Проверка на дубликаты (если в базе не должно быть одинаковых названий)
      const existingCuisine = await Cuisine.findOne({ where: { name } });
      if (existingCuisine) {
        return next(ApiError.badRequest('Кухня с таким названием уже существует.'));
      }
  
      const cuisine = await Cuisine.create({ name });
      return res.json(cuisine);
    } catch (e) {
      console.error('Ошибка при создании кухни:', e); // Логирование ошибки на сервере
      next(ApiError.badRequest(e.message || 'Произошла ошибка при создании кухни.'));
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
