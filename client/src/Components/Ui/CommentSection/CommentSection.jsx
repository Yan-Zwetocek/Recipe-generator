import React, { useState } from 'react';
import ColorButton from '../ColorButton/ColorButton';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText('');
    }
  };

  return (
    <div className="container">
      <h2>Комментарии</h2>
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
        <ColorButton type="submit" className="btn btn-primary">Отправить</ColorButton>
      </form>
      <div className="mt-3">
        <h3>Список комментариев:</h3>
        <ul className="list-group">
          {comments.map((comment, index) => (
            <li key={index} className="list-group-item">{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentSection;

