import React from "react";
import "./FilterSuggestions.css";

import { Loading } from "../Loading/Loading";

interface FilterSuggestionsProps {
  filters: string[];
  isLoading: boolean;
  onFilterSelect: (filter: string) => void;
}

const FilterSuggestions: React.FC<FilterSuggestionsProps> = ({
  filters,
  isLoading,
  onFilterSelect,
}) => {
  if (isLoading) return <Loading />;

  return filters.length > 0 ? (
    <div className="filter-suggestions">
      <h2>Filtros Gerados</h2>
      <h4>Escolha um</h4>
      <ul className="filter-suggestions-list">
        {filters.map((filter, index) => (
          <li key={index}>
            <button onClick={() => onFilterSelect(filter)}>{filter}</button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default FilterSuggestions;
