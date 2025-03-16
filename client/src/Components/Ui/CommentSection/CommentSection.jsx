import React, { useContext, useEffect, useState } from "react";
import ColorButton from "../ColorButton/ColorButton";
import CommentService from "../../../Services/comment-service";
import { Image } from "react-bootstrap";
import { Context } from "../../..";

const CommentSection = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await CommentService.getAllByRecipeId(recipeId);
        setComments(response.data);
        setError(null);
      } catch (e) {
        setError(e.message);
        console.error("Ошибка при загрузке комментариев:", e);
      }
    };
    fetchComments();
  }, [recipeId, ]);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      try {
        const newComment = await CommentService.crate({ 
          recipeId: recipeId,
          commentText: commentText, 
          userId: user._user.data.id,
        });

        setComments([...comments, newComment.data]);
        setCommentText("");
        setError(null);
      } catch (e) {
        setError(e.message);
        console.error("Ошибка при отправке комментария:", e);
      }
    }
  };

  return (
    <div className="container">
      <h2>Комментарии</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleCommentSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={commentText}
            onChange={handleCommentChange}
            placeholder="Напишите ваш комментарий..."
            required
            rows="3"
          />
        </div>
        <ColorButton type="submit" className="btn btn-primary">
          Отправить
        </ColorButton>
      </form>
      <div className="mt-3">
        <h3>Список комментариев:</h3>
        <ul className="list-group">
          {comments.map((comment, index) => (
            <li key={index} className="list-group-item">
              <div style={{ display: "flex", alignItems: "center" }}>                {/* Отображаем аватар или круг с логотипом */}
                {comment.user ? ( // Проверяем существование comment.user
                  comment.user.avatar ? ( // Затем проверяем существование comment.user.avatar
                    <Image
                      src={comment.user.avatar}
                      alt={comment.user.username}
                      width={30}
                      height={30}
                      roundedCircle
                    />
                  ) : (
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "#ff7b00",
                        marginRight: "8px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image src="/logo/chef-svgrepo-com (1).svg" width={20} height={20} />
                    </div>
                  )
                ) : (
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#ff7b00",
                      marginRight: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image src="/logo/chef-svgrepo-com (1).svg" width={20} height={20} />
                  </div>
                )}
                {comment.user && <span>{comment.user.username}</span>}
              </div>
              {comment.comment_text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentSection; 