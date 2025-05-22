import React from "react";
import "./PostCard.css";
import { formatDateToBrazilian } from "../../../../utils/dateUtils";
import { decodeHtml } from "../../../../utils/decodeHtml";
import Checkmark from "../Checkmark/Chekmark";

export interface PostAuthor {
  name: string;
  username: string;
  avatar: string;
}

export interface Post {
  content: string;
  url: string;
  date: string;
  author: PostAuthor;
}

const PostCard: React.FC<{
  post: Post;
  isSelected: boolean;
  onSelect: (post: Post) => void;
}> = ({ post, isSelected, onSelect }) => {
  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>, post: Post) => {
    e.stopPropagation();
    onSelect(post);
  };

  return (
    <div
      className={`post-card ${isSelected ? "selected" : ""}`}
      onClick={() => window.open(post.url, "_blank")}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <div className="post-card-header">
        <div className="header-info">
          <img
            src={post.author.avatar}
            alt={`${post.author.name}'s avatar`}
            className="post-card-avatar"
          />
          <div className="post-card-user-info">
            <p className="post-card-username">@{post.author.username}</p>
            <p className="post-card-date">{formatDateToBrazilian(post.date)}</p>
          </div>
        </div>
        <Checkmark
          isSelected={isSelected}
          onClick={(e) => handleSelect(e, post)}
        />
      </div>
      <div className="post-card-content">
        <span className="post-card-content-span">
          {decodeHtml(post.content)}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
