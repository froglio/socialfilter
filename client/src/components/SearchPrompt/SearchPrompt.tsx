import React, { useState } from "react";
import "./SearchPrompt.css";

import { IoSend } from "react-icons/io5";

interface SearchPromptProps {
  onGenerateFilters: (
    isFormValid: boolean,
    prompt: string,
    startDate: string,
    endDate: string
  ) => void;
}

const SearchPrompt: React.FC<SearchPromptProps> = ({ onGenerateFilters }) => {
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

  return (
    <div className="search-prompt">
      <div className="input-row">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Quero feedbacks do atendimento das lojas Renner"
          className="search-input"
        />
        <button
          onClick={() =>
            onGenerateFilters(isFormValid, prompt, startDate, endDate)
          }
          className="search-button"
          disabled={!isFormValid}
        >
          <IoSend />
        </button>
      </div>
      <div className="input-row search-date-wrapper">
        <div className="search-initial-date">
          <p>Data inicial</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="search-date-input"
            required
          />
        </div>
        <div className="search-final-date">
          <p>Data final</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="search-date-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPrompt;
