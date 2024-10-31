const Router = require("express");
const router = new Router();
const commentController = require('./controllers/commentController');
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, commentController.createComment);
router.get("/:recipeId",  commentController.getCommentsByRecipeId);
router.delete("/:id", commentController.deleteCommentsByRecipeId);
router.put("/:id", authMiddleware,  commentController.updateCommentsByRecipeId);


module.exports = router;
