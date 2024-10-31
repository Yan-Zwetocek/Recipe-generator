const Router = require("express");
const router = new Router();
const recipeController = require('./controllers/recipeController');
const authMiddleware = require("../middleware/authMiddleware");

router.get("/",  recipeController.getAllRecipe);
router.post("/", authMiddleware, recipeController.createRecipe);
router.get('/:id', recipeController.getRecipeById)
router.delete('/:id', recipeController.deleteRecipeById)
router.put('/:id', authMiddleware, recipeController.updateRecipe)

module.exports = router;
