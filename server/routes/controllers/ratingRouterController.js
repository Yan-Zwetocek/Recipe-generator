const { Rating, Recipe } = require("../../models/models");
const ApiError = require("../../error/ApiError");

class RatingController {
    async  createRating(req, res, next) {
        try {
          const { user_id, recipe_id, rate } = req.body; // Получите recipe_id из запроса
    
          // Найдите рецепт по ID
          const recipe = await Recipe.findByPk(recipe_id); 
    
          if (!recipe) {
            return next(ApiError.notFound('Recipe not found'));
          }
    
          // Создайте оценку с использованием ассоциаций
          const rating = await recipe.createRating({
            user_id : user_id,
            rate : rate
          });
    
          return res.json(rating);
        } catch (e) {
          console.error("Error in createRating:", e);
          next(ApiError.badRequest(e.message));
        }
      }
      
    
  async getRatingByRecipeId(req, res, next) {
    try {
      const { recipe_id } = req.params; // Получение recipe_id из URL

      // Получение всех оценок для рецепта
      const ratings = await Rating.findAll({
        where: { recipe_id },
      });

      return res.json(ratings);
    } catch (e) {
      console.error("Error in getRatingByRecipeId:", e);
      next(ApiError.badRequest(e.message));
    }
  }
  async deleteRating(req, res, next) {
    try {
     const { id } = req.params; // Получение ID оценки из URL
  
     // Найдите оценку по ID
     const rating = await Rating.findByPk(id);
  
     if (!rating) {
      return next(ApiError.notFound("Rating not found"));
     }
  
     // Получите recipe_id из найденной оценки
     const recipeId = rating.recipe_id;
  
     // Удалите оценку
     const deletedCount = await Rating.destroy({ where: { id } });
  
     // Проверка, была ли удалена оценка
     if (deletedCount === 0) {
      return next(ApiError.notFound("Rating not found"));
     }
  
     // Дополнительная логика, если необходимо
     // Например, обновление общей оценки рецепта после удаления оценки
  
     return res.json({ message: "Rating deleted successfully", recipeId });
    } catch (e) {
     console.error("Error in deleteRating:", e);
     next(ApiError.badRequest(e.message));
    }
   }
  }
  
  module.exports = new RatingController();

