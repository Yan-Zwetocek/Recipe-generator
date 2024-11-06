const Router = require("express");
const router = new Router();
const recipeController = require('./controllers/recipeController');
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/",  recipeController.getAllRecipe);
router.post("/", authMiddleware, recipeController.createRecipe);
router.get('/:id', recipeController.getRecipeById)
router.delete('/:id', recipeController.deleteRecipeById)
router.put('/:id', checkRole('ADMIN'), authMiddleware, recipeController.updateRecipe)

module.exports = router;
