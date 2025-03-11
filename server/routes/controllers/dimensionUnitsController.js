const { DimensionUnits } = require("../../models/models"); // Убедитесь, что путь правильный
const ApiError = require("../../error/ApiError");

class dimensionUnitsController {
  async create(req, res, next) {
    try {
      const { name } = req.body;

      // Проверка: name должно существовать и быть строкой
      if (!name || typeof name !== 'string' || name.trim() === '') {
        return next(ApiError.badRequest('Название единицы измерения (name) обязательно и должно быть строкой.'));
      }

      // Проверка на дубликаты (если в базе не должно быть одинаковых названий)
      const existingDimensionUnit = await DimensionUnits.findOne({ where: { name } });
      if (existingDimensionUnit) {
        return next(ApiError.badRequest('Единица измерения с таким названием уже существует.'));
      }

      const dimensionUnit = await DimensionUnits.create({ name });
      return res.json(dimensionUnit);
    } catch (e) {
      console.error('Ошибка при создании единицы измерения:', e); // Логирование ошибки на сервере
      next(ApiError.badRequest(e.message || 'Произошла ошибка при создании единицы измерения.'));
    }
  }

  async getAll(req, res, next) {
    try {
      const dimensionUnits = await DimensionUnits.findAll();
      return res.json(dimensionUnits);
    } catch (e) {
      next(ApiError.badRequest(e.message)); // Исправлено: e.massage -> e.message
    }
  }

  async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      const dimensionUnit = await DimensionUnits.destroy({ where: { id } });

      if (!dimensionUnit) {
        return next(ApiError.notFound('Единица измерения с таким ID не найдена.')); // Если удаление не произошло
      }
      return res.json({ message: 'Единица измерения успешно удалена.' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      // Проверка: name должно существовать и быть строкой
      if (name && typeof name !== 'string') {
        return next(ApiError.badRequest('Название единицы измерения (name) должно быть строкой.'));
      }

      const [updated] = await DimensionUnits.update({ name }, { where: { id } });

      if (updated === 0) { // Проверяем, было ли что-то обновлено
        return next(ApiError.notFound('Единица измерения с таким ID не найдена.'));
      }

      const updatedDimensionUnit = await DimensionUnits.findByPk(id);

      return res.json(updatedDimensionUnit);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new dimensionUnitsController();