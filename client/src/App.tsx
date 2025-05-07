import React, { useState } from "react";
import "./App.css";
import SearchPrompt from "./components/SearchPrompt";
import FilterSuggestions from "./components/FilterSuggestions";
import ResultsGrid from "./components/ResultsGrid";
import axios from "axios";

const App: React.FC = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [results, setResults] = useState([]);

  const handleFiltersGenerated = (generatedFilters: string[]) => {
    setFilters(generatedFilters);
  };

  const handleFilterSelect = async (filter: string) => {
    try {
      const response = await axios.post("/scrape", { filter });
      setResults(response.data.posts);
    } catch (error) {
      console.error("Erro ao buscar resultados:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Social Filter</h1>
      </header>
      <main>
        <SearchPrompt onFiltersGenerated={handleFiltersGenerated} />
        {filters.length > 0 && (
          <FilterSuggestions
            filters={filters}
            onFilterSelect={handleFilterSelect}
          />
        )}
        {results.length > 0 && <ResultsGrid results={results} />}
      </main>
    </div>
  );
};

export default App;
