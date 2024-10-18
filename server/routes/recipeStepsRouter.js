const Router = require("express");
const router = new Router();
const recipeStepsController = require('./controllers/recipeStepsController');

router.post("/", recipeStepsController.recipeStepsCreate);
router.get("/:recipeId", recipeStepsController.getAllRecipeStepsByRecipeId); // Добавь маршрут
router.delete("/:id", recipeStepsController.deleteRecipeStep);

module.exports = router;


