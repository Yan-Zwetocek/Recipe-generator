const Router = require("express");
const router = new Router();
const ingredientController = require('./controllers/ingredientController');

router.post("/", ingredientController.ingredientCreate);
router.get("/", ingredientController.getAllIngredients);
router.delete("/:id", ingredientController.deleteIngredientById);

module.exports = router;
