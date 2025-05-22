import React, { useState } from "react";
import "./App.css";
import SearchPrompt from "./components/SearchPrompt/SearchPrompt";
import FilterSuggestions from "./components/FilterSuggestions/FilterSuggestions";
import ResultsGrid from "./components/ResultsGrid/ResultsGrid";
import axios from "axios";

const App: React.FC = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [results, setResults] = useState([]);

  const [isFiltersLoading, setIsFiltersLoading] = useState(false);
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  const handleGenerateFilters = async (
    isFormValid: boolean,
    prompt: string,
    startDate: string,
    endDate: string
  ) => {
    if (!isFormValid) return;

    try {
      setIsFiltersLoading(true);
      const response = await axios.post("/generate-filters", {
        prompt,
        startDate,
        endDate,
      });
      setFilters(response.data.filters);
      setIsFiltersLoading(false);
    } catch (error) {
      console.error("Erro ao gerar filtros:", error);
    }
  };

  const handleFilterSelect = async (filter: string) => {
    try {
      setIsResultsLoading(true);
      const response = await axios.post("/scrape", { filter });
      setResults(response.data.posts);
      setIsResultsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar resultados:", error);
    }
  };

  return (
    <div className="App">
      <div className="mainContainer">
        <header className="App-header">
          <h1 style={{ textAlign: "center" }}>Social Filter</h1>
        </header>
        <main>
          <SearchPrompt onGenerateFilters={handleGenerateFilters} />
          <FilterSuggestions
            filters={filters}
            isLoading={isFiltersLoading}
            onFilterSelect={handleFilterSelect}
          />
          <ResultsGrid results={results} isLoading={isResultsLoading} />
        </main>
      </div>
    </div>
  );
};

export default App;
