const Router = require("express");
const router = new Router();
const recipeStepsController = require('./controllers/recipeStepsController');
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, recipeStepsController.recipeStepsCreate);
router.get("/:recipeId", recipeStepsController.getAllRecipeStepsByRecipeId); // Добавь маршрут
router.delete("/:id", authMiddleware, recipeStepsController.deleteRecipeStep);

module.exports = router;


