import React, { useState } from "react";
import axios from "axios";
import "./SearchPrompt.css";

interface SearchPromptProps {
  onFiltersGenerated: (filters: string[]) => void;
}

const SearchPrompt: React.FC<SearchPromptProps> = ({ onFiltersGenerated }) => {
  const [prompt, setPrompt] = useState("");

  const handleGenerateFilters = async () => {
    try {
      const response = await axios.post("/generate-filters", { prompt });
      onFiltersGenerated(response.data.filters);
    } catch (error) {
      console.error("Erro ao gerar filtros:", error);
    }
  };

  return (
    <div className="search-prompt">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Quero 20 feedbacks do atendimento das lojas Renner"
        className="search-input"
      />
      <button onClick={handleGenerateFilters} className="search-button">
        Gerar Filtros
      </button>
    </div>
  );
};

export default SearchPrompt;
