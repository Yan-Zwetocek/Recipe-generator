const Router = require("express");
const router = new Router();
const recipeController = require('./controllers/recipeController')

router.get("/", recipeController.getAllRecipe);
router.post("/", recipeController.createRecipe);
router.get('/:id', recipeController.getRecipeById)
router.delete('/:id', recipeController.deleteRecipeById)
router.put('/:id', recipeController.updateRecipe)

module.exports = router;
