const {Comment, User} = require('../../models/models')
const ApiError = require('../../error/ApiError')
class commentController {
    async createComment(req, res, next) {
        // Логика для создания комментария
        try {
            const { commentText, recipeId, userId } = req.body;
            const comment = await Comment.create({  comment_text: commentText, recipeId, userId });
            return res.json(comment);
          } catch (e) {
            next(ApiError.badRequest(e.message));
          }
    }

    async getCommentsByRecipeId(req, res, next) {
      try {
        const { recipeId } = req.params;
    
        const comments = await Comment.findAll({
          where: { recipeId },
          include: [
            {
              model: User,
              attributes: ["id", "username", "avatar"], // Укажите, какие атрибуты пользователя вам нужны
            },
          ],
          order: [['createdAt', 'DESC']] // Сортировка по дате создания, чтобы новые были сверху
        });
    
        return res.json(comments);
      } catch (e) {
        next(ApiError.badRequest(e.message));
      }
    }
    
    

    async deleteCommentsByRecipeId(req, res, next) {
        try {
            const { id } = req.params;
            const comment = await Comment.destroy({ where: { id } });
            return res.json(comment);
          } catch (e) {
            next(ApiError.badRequest(e.message));
          }
        
    }
    async updateCommentsByRecipeId(req, res, next) {
        try {
          const { commentText } = req.body;
            const { id } = req.params;
            const [updated] = await Comment.update({ comment_text: commentText }, {where: { id }} );
            if (!updated) {
              return res.status(404).json({ message: "Comment not found" });
            }
            const updatedComment = await Comment.findByPk(id);

            return res.json(updatedComment);
          } catch (e) {
            next(ApiError.badRequest(e.message));
          }
        
    }

   
}

module.exports = new commentController();
