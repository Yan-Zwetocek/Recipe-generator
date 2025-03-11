const uuid = require("uuid");
const path = require("path");
const { Recipe, Recipe_ingredients, Ingredients, RecipeSteps } = require("../../models/models");
const ApiError = require("../../error/ApiError");

class recipeController {
  async getAllRecipe(req, res, next) {
    try {
      let { cuisineId, categoryId, limit = 9, page = 1 } = req.query;

      let offset = (page - 1) * limit;
      limit = parseInt(limit, 10) || 9; 
      page = parseInt(page, 10) || 1; 

      let recipes;

      if (categoryId && cuisineId) {
        recipes = await Recipe.findAndCountAll({
          where: { categoryId, cuisineId },
          limit,
          offset,
        });
      } else if (!categoryId && cuisineId) {
        recipes = await Recipe.findAndCountAll({
          where: { cuisineId },
          limit,
          offset,
        });
      } else if (categoryId && !cuisineId) {
        recipes = await Recipe.findAndCountAll({
          where: { categoryId },
          limit,
          offset,
        });
      } else {
        recipes = await Recipe.findAndCountAll({
          limit,
          offset,
        });
      }

      return res.json(recipes);
    } catch (e) {
      console.error("Error in getAllRecipe:", e);
      next(ApiError.badRequest(e.message));
    }
  }

  async createRecipe(req, res, next) {
    try {
      const {
        userId,
        name,
        description,
        time_to_prepare,
        categoryId, 
        cuisineId
      } = req.body;

      // Обработка массивов
      let ingredientIds = [];
      let quantities = [];
      let dimensionUnitIds = [];  // Добавили массив для единиц измерения

      if (Array.isArray(req.body.ingredientIds)) {
        ingredientIds = req.body.ingredientIds.map(id => parseInt(id, 10));
        quantities = req.body.quantities.map(qty => parseInt(qty, 10));
        dimensionUnitIds = req.body.dimensionUnitIds.map(id => parseInt(id, 10)); // Обрабатываем dimensionUnitIds
      } else if (req.body["ingredientIds[0]"]) {
        let index = 0;
        while (req.body[`ingredientIds[${index}]`] !== undefined) {
          ingredientIds.push(parseInt(req.body[`ingredientIds[${index}]`], 10));
          quantities.push(parseInt(req.body[`quantities[${index}]`], 10));
          dimensionUnitIds.push(parseInt(req.body[`dimensionUnitIds[${index}]`], 10)); // Добавили обработку
          index++;
        }
      }

      if (ingredientIds.length === 0) {
        return res.status(400).json({ error: "No ingredientIds!!!" });
      }

      const { recipe_img } = req.files;
      let fileName = uuid.v4() + ".jpg";

      await recipe_img.mv(
        path.resolve(__dirname, "../../", "static", "dishes", fileName)
      );

      const recipe = await Recipe.create({
        userId,
        name,
        description,
        time_to_prepare,
        recipe_img: fileName,
        categoryId,
        cuisineId,
      });

      // Добавляем ингредиенты с dimensionUnitId
      const ingredientPromises = ingredientIds.map((ingredientId, index) => {
        return Recipe_ingredients.create({
          recipe_id: recipe.id,
          ingredient_id: ingredientId,
          quantity: quantities[index],
          dimension_unit_id: dimensionUnitIds[index], 
        });
      });

              // Обработка шагов рецепта
      let steps =[] ;
      let stepIndex = 0;

      while (req.body[`steps[${stepIndex}][description]`] !== undefined) {
        let step = {
          description: req.body[`steps[${stepIndex}][description]`],
          step_image: req.files && req.files[`steps[${stepIndex}][file]`]
            ? req.files[`steps[${stepIndex}][file]`]
            : null,
        };
        steps.push(step);
        stepIndex++;
      }

      if (steps.length > 0) {
        const stepsPromises = steps.map((step, index) => {
          let stepFileName = null;

          if (step.step_image) {
            stepFileName = uuid.v4() + ".jpg";
            step.step_image.mv(
              path.resolve(__dirname, "../../", "static", "steps", stepFileName)
            );
          }

          return RecipeSteps.create({
            recipe_id: recipe.id,
            step_number: index + 1,
            description: step.description,
            step_image: stepFileName,
          });
        });

        await Promise.all(stepsPromises);
      }

  

      await Promise.all(ingredientPromises);

      return res.json(recipe);
    } catch (e) {
      console.error("Error in createRecipe:", e);
      next(ApiError.badRequest(e.message));
    }
  }

  async getRecipeById(req, res, next) {
    try {
     const { id } = req.params;
     const recipe = await Recipe.findByPk(id, {
      include: [{ model: Recipe_ingredients }],
    });
    
   
     if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
     }
   
     return res.json(recipe);
    } catch (e) {
     console.error("Error in getRecipeById:", e);
     next(ApiError.badRequest(e.message));
    }
   }
     

  async deleteRecipeById(req, res, next) {
    try {
     const { id } = req.params;
     const recipe = await Recipe.destroy({where: {id}})
    
    
   
     if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
     }
   
     return res.json(recipe);
    } catch (e) {
     console.error("Error in getRecipeById:", e);
     next(ApiError.badRequest(e.message));
    }
   }
   async updateRecipe(req, res, next) {
    try {
      const { id } = req.params; // Получаем ID рецепта из параметров запроса
      const {
        name,
        description,
        time_to_prepare,
        ingredientIds,
        categoryId,
        cuisineId,
      } = req.body;
  
      // Поиск рецепта по ID
      const recipe = await Recipe.findByPk(id);
  
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
  
      // Обновление полей рецепта
      await recipe.update({
        name,
        description,
        time_to_prepare,
        categoryId,
        cuisineId,
      });
  
      // Если ингредиенты были переданы, обновляем их
      if (ingredientIds && ingredientIds.length > 0) {
        // Удаляем старые ингредиенты рецепта
        await Recipe_ingredients.destroy({ where: { recipe_id: id } });
  
        // Добавляем новые ингредиенты
        const ingredientPromises = ingredientIds.map((ingredientId, index) => {
          const quantity = req.body[`quantity${index + 1}`]; // Получаем количество по индексу
          return Recipe_ingredients.create({
            recipe_id: recipe.id,
            ingredient_id: ingredientId,
            quantity: quantity, // Передаем количество
          });
        });
  
        await Promise.all(ingredientPromises);
      }
  
      return res.json(recipe); // Возвращаем обновленный рецепт
    } catch (e) {
      console.error("Error in updateRecipe:", e);
      next(ApiError.badRequest(e.message)); // Обработка ошибок
    }
  }
  
  }
  
module.exports = new recipeController();
