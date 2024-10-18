const Router = require("express");
const router = new Router();
const ratingRouterController = require("./controllers/ratingRouterController");

router.post("/", ratingRouterController.createRating);
router.get("/recipe_id/:recipe_id", ratingRouterController.getRatingByRecipeId);
router.delete("/:id", ratingRouterController.deleteRating);

module.exports = router;
