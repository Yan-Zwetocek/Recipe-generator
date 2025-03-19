const uuid = require("uuid");
const path = require("path");
const { Recipe, Recipe_ingredients, Ingredients, RecipeSteps, DimensionUnits } = require("../../models/models");
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

        // Проверка обязательных полей
        if (!userId || !name || !description || !time_to_prepare || !categoryId || !cuisineId) {
            return res.status(400).json({ error: "Не все обязательные поля заполнены!" });
        }

        // Проверка наличия файла
        if (!req.files || !req.files.recipe_img) {
            return res.status(400).json({ error: "Не загружено изображение рецепта!" });
        }

        // Обработка массивов ингредиентов
        let ingredientIds = [], quantities = [], dimensionUnitIds = [];
        
        if (Array.isArray(req.body.ingredientIds)) {
            ingredientIds = req.body.ingredientIds.map(id => parseInt(id, 10));
            quantities = req.body.quantities.map(qty => parseInt(qty, 10));
            dimensionUnitIds = req.body.dimensionUnitIds.map(id => parseInt(id, 10));
        } else if (req.body["ingredientIds[0]"]) {
            let index = 0;
            while (req.body[`ingredientIds[${index}]`] !== undefined) {
                ingredientIds.push(parseInt(req.body[`ingredientIds[${index}]`], 10));
                quantities.push(parseInt(req.body[`quantities[${index}]`], 10));
                dimensionUnitIds.push(parseInt(req.body[`dimensionUnitIds[${index}]`], 10));
                index++;
            }
        }

        // Проверка на наличие ингредиентов
        if (ingredientIds.length === 0) {
            return res.status(400).json({ error: "Не добавлены ингредиенты!" });
        }

        // Проверка на соответствие размеров массивов
        if (ingredientIds.length !== quantities.length || ingredientIds.length !== dimensionUnitIds.length) {
            return res.status(400).json({ error: "Ошибка в данных ингредиентов!" });
        }

        // Обработка шагов рецепта
        let steps = [];
        let stepIndex = 0;
        while (req.body[`steps[${stepIndex}][description]`] !== undefined) {
            let step = {
                description: req.body[`steps[${stepIndex}][description]`],
                step_image: req.files && req.files[`steps[${stepIndex}][file]`] 
                    ? req.files[`steps[${stepIndex}][file]`] 
                    : null
            };
            steps.push(step);
            stepIndex++;
        }

        // Проверка на наличие описания шагов
        if (steps.length === 0) {
            return res.status(400).json({ error: "Не добавлены шаги рецепта!" });
        }

        // Сохранение изображения рецепта
        const { recipe_img } = req.files;
        let fileName = uuid.v4() + ".jpg";
        await recipe_img.mv(path.resolve(__dirname, "../../", "static", "dishes", fileName));

        // Создание рецепта
        const recipe = await Recipe.create({
            userId,
            name,
            description,
            time_to_prepare,
            recipe_img: fileName,
            categoryId,
            cuisineId
        });

        // Добавляем ингредиенты
        const ingredientPromises = ingredientIds.map((ingredientId, index) => {
            return Recipe_ingredients.create({
                recipe_id: recipe.id,
                ingredient_id: ingredientId,
                quantity: quantities[index],
                dimension_unit_id: dimensionUnitIds[index]
            });
        });

        // Добавляем шаги рецепта
        const stepsPromises = steps.map((step, index) => {
            let stepFileName = null;
            if (step.step_image) {
                stepFileName = uuid.v4() + ".jpg";
                step.step_image.mv(path.resolve(__dirname, "../../", "static", "steps", stepFileName));
            }
            return RecipeSteps.create({
                recipe_id: recipe.id,
                step_number: index + 1,
                description: step.description,
                step_image: stepFileName
            });
        });

        await Promise.all(ingredientPromises);
        await Promise.all(stepsPromises);

        return res.json(recipe);
    } catch (e) {
        console.error("Ошибка в createRecipe:", e);
        next(ApiError.badRequest(e.message));
    }
}


  async getRecipeById(req, res, next) {
    try {
      const { id } = req.params;
      const recipe = await Recipe.findByPk(id, {
        include: [
          {
            model: Ingredients,
            through: {
              attributes: ["quantity"],
            },
            attributes: [
              "id",
              "name",
              "protein_content",
              "fat_content",
              "carbohydrate_content",
              "calorie_content", 
              "weight_in_grams",
            ],
            include: [
              {
                model: Recipe_ingredients,
                as: "recipeIngredients", // Указываем алиас
                attributes: ["quantity",],
                include: [
                  {
                    model: DimensionUnits,
                    attributes: ["id", "name"], // Получаем данные об единицах измерения
                  },
                ],
              },
            ],
          },
          {
            model: RecipeSteps,
            order: [["step_number", "ASC"]],
          },
        ],
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
