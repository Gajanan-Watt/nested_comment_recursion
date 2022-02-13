import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import "./comment.css";


export const Comment = ({
    id,
    root,
    setRoot,
    commentMessage,
    // child,
    // parent,
    showCommentBoxInitial
  }) => {
    const [comment, setComment] = useState("");
    const [showCommentBox, setShowCommentBox] = useState(
      showCommentBoxInitial ? showCommentBoxInitial : false
    );
  
    const findParentAndAddChild = (comments, parent, commentMessage) => {
      console.log("In findParentAndAddChild");
      if (comments.length === 0) {
        return [];
      }
  
      return comments.map((comment) => {
        console.log("comment: ", comment, "parent: ", parent);
  
        if (comment.id === parent) {
          console.log("matched");
          return {
            ...comment,
            child: [
              ...comment.child,
              {
                id: uuidV4(),
                commentMessage: commentMessage,
                child: [],
                parent: comment.id
              }
            ]
          };
        } else {
          return {
            ...comment,
            child: findParentAndAddChild(comment.child, parent, commentMessage)
          };
        }
      });
    };
  
    const handleCommentSubmit = (e) => {
      e.preventDefault();
  
      let updatedRoot = [...root];
  
      if (id === "root") {
        updatedRoot.push({
          id: uuidV4(),
          commentMessage: comment,
          child: [],
          parent: "root"
        });
      } else {
        updatedRoot = findParentAndAddChild(root, id, comment);
      }
  
      setRoot(updatedRoot);
      setComment("");
  
      !showCommentBoxInitial && setShowCommentBox(false);
    };
  
    const handleClick = (e) => {
      setShowCommentBox((showCommentBox) => !showCommentBox);
    };
  
    return (
      <div className="main_div">
        <p>{commentMessage}</p>
        {showCommentBox ? (
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" disabled={comment.length === 0 ? true : false}>
              Submit
            </button>
          </form>
        ) : (
          <button onClick={handleClick}>Reply</button>
        )}
      </div>
    );
  };