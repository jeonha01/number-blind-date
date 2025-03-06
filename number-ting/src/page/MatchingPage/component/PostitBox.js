import React from 'react';
import './PostitBox.style.css';

const PostitBox = ({ item }) => {
  return (
    <div className="postit-box">
      
      <div className="postit-header">
        <span className="postit-age">{item.age}세</span>
        <span className="postit-mbti">{item.mbti}</span>
      </div>
      
      <div className="postit-body">
        <p><strong>학과:</strong> {item.department}</p>
        <p><strong>키:</strong> {item.height}cm</p>
        <p><strong>관심사:</strong> {item.hobby}</p>
        <p><strong>하고 싶은 말:</strong> {item.highlight}</p>
      </div>
    </div>
  );
};

export default PostitBox;
