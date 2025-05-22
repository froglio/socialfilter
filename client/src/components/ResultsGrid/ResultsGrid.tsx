import React, { useState } from "react";
import axios from "axios";
import "./ResultsGrid.css";
import PostCard, { Post } from "../PostCard/PostCard";

import { Loading } from "../Loading/Loading";

interface ResultsGridProps {
  results: Post[];
  isLoading: boolean;
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

const ResultsGrid: React.FC<ResultsGridProps> = ({ results, isLoading }) => {
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([]);

  const handleSelectPost = (post: Post) => {
    setSelectedPosts((prevSelected) => {
      if (prevSelected.includes(post)) {
        return prevSelected.filter((p) => p !== post);
      } else {
        return [...prevSelected, post];
      }
    });
  };

  const handleDownload = () => {
    const postsToDownload = selectedPosts.length > 0 ? selectedPosts : results;
    downloadScreenshots(postsToDownload);
  };

  const handleSelectAll = () => {
    setSelectedPosts(results);
  };

  const handleDeselectAll = () => {
    setSelectedPosts([]);
  };

  if (isLoading) return <Loading />;

  return results.length > 0 ? (
    <div className="results-grid">
      <div className="actions">
        <div className="actions-selectable">
          <button className="select-all-button" onClick={handleSelectAll}>
            Selecionar Todos
          </button>
          <button className="deselect-all-button" onClick={handleDeselectAll}>
            Deselecionar Todos
          </button>
        </div>
        <button className="download-button" onClick={handleDownload}>
          Baixar Screenshots{" "}
          {selectedPosts.length > 0 && `(${selectedPosts.length})`}
        </button>
      </div>
      <div className="grid">
        {results.map((result, index) => (
          <PostCard
            key={index}
            post={result}
            isSelected={selectedPosts.includes(result)}
            onSelect={handleSelectPost}
          />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ResultsGrid;
