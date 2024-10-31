const Router = require("express");
const router = new Router();
const ratingRouterController = require("./controllers/ratingRouterController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, ratingRouterController.createRating);
router.get("/recipe_id/:recipe_id", ratingRouterController.getRatingByRecipeId);
router.delete("/:id", authMiddleware, ratingRouterController.deleteRating);

module.exports = router;
