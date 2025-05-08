import React, { useState } from "react";
import axios from "axios";
import "./SearchPrompt.css";

interface SearchPromptProps {
  onFiltersGenerated: (filters: string[]) => void;
}

const SearchPrompt: React.FC<SearchPromptProps> = ({ onFiltersGenerated }) => {
  const [prompt, setPrompt] = useState("");

  const currentDate = new Date();
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(currentDate.getFullYear() - 3);

  const [startDate, setStartDate] = useState(
    threeYearsAgo.toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(currentDate.setDate(currentDate.getDate() + 1))
      .toISOString()
      .split("T")[0]
  );

  const isFormValid =
    prompt.trim() !== "" && startDate.trim() !== "" && endDate.trim() !== "";

  const handleGenerateFilters = async () => {
    if (!isFormValid) return;

    try {
      const response = await axios.post("/generate-filters", {
        prompt,
        startDate,
        endDate,
      });
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
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="date-input"
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="date-input"
        required
      />
      <button
        onClick={handleGenerateFilters}
        className="search-button"
        disabled={!isFormValid}
      >
        Gerar Filtros
      </button>
    </div>
  );
};

export default SearchPrompt;
