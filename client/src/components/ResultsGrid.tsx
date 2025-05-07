import React from "react";
import axios from "axios";
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

const downloadScreenshots = async (posts: Post[]) => {
  try {
    const response = await axios.post(
      "/download-posts",
      { posts },
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );
    if (response.status !== 200) {
      throw new Error("Erro ao capturar screenshots");
    }

    const url = window.URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "screenshots.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erro ao fazer o download das screenshots:", error);
    throw new Error(
      `Erro ao fazer o download das screenshots: ${
        error instanceof Error ? error.message : (error as string)
      }`
    );
  }
};

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
      <button
        className="download-button"
        onClick={() => downloadScreenshots(results)}
      >
        Baixar Screenshots
      </button>
      <div className="grid">
        {results.map((result, index) => (
          <PostCard key={index} post={result} />
        ))}
      </div>
    </div>
  );
};

export default ResultsGrid;
