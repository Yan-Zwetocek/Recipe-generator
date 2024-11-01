const Router = require("express");
const router = new Router();
const ingredientController = require('./controllers/ingredientController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post("/", checkRole('ADMIN'), ingredientController.ingredientCreate);
router.get("/" , ingredientController.getAllIngredients);
router.delete("/:id", checkRole('ADMIN'), ingredientController.deleteIngredientById);

module.exports = router;
