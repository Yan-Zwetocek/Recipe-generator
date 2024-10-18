const Router = require("express");
const router = new Router();
const commentController = require('./controllers/commentController')

router.post("/", commentController.createComment);
router.get("/:recipeId", commentController.getCommentsByRecipeId);
router.delete("/:id", commentController.deleteCommentsByRecipeId);
router.put("/:id", commentController.updateCommentsByRecipeId);


module.exports = router;
