import React from "react";
import "./ResultsGrid.css";

interface PostAuthor {
  name: string;
  username: string;
  avatar: string;
}

interface Post {
  content: string;
  url: string;
  date: string;
  author: PostAuthor;
}

interface ResultsGridProps {
  results: Post[];
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div
      className="post-card"
      onClick={() => window.open(post.url, "_blank")}
      style={{ cursor: "pointer" }}
    >
      <div className="post-card-header">
        <img
          src={post.author.avatar}
          alt={`${post.author.name}'s avatar`}
          className="post-card-avatar"
        />
        <div className="post-card-user-info">
          <p className="post-card-username">@{post.author.username}</p>
          <p className="post-card-date">{post.date}</p>
        </div>
      </div>
      <div className="post-card-content">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

const ResultsGrid: React.FC<ResultsGridProps> = ({ results }) => {
  return (
    <div className="results-grid">
      <h3>Resultados:</h3>
      <div className="grid">
        {results.map((result, index) => (
          <PostCard key={index} post={result} />
        ))}
      </div>
    </div>
  );
};

export default ResultsGrid;
