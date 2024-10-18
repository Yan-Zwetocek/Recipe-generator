const { RecipeSteps } = require("../../models/models");
const ApiError = require("../../error/ApiError");

class RecipeStepsController {
  async recipeStepsCreate(req, res, next) { 
    try { 
     const { recipe_id, step_number, description, step_image } = req.body; 
     const recipeSteps = await RecipeSteps.create({ 
      recipe_id, 
      step_number, 
      description, 
      step_image, 
     }); 
     if (recipe_id===null) {
      return next(ApiError.badRequest('recipe_id is required'));
    }
     return res.json(recipeSteps); 
    } catch (e) { 
     next(ApiError.badRequest(e.message)); 
    } 
   }
   

   async getAllRecipeStepsByRecipeId(req, res, next) { 
    try { 
     const { recipeId } = req.params; 
     const recipeSteps = await RecipeSteps.findAll({ 
      where: { recipe_id: recipeId }, 
     }); 
     return res.json(recipeSteps); 
    } catch (e) { 
     next(ApiError.badRequest(e.message)); 
    } 
   }
   

  async deleteRecipeStep(req, res, next) {
    try {
      const { id } = req.params;
      const recipeStep = await RecipeSteps.destroy({ where: { id } });
      return res.json(recipeStep);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new RecipeStepsController();
