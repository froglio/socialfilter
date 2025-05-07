import React from "react";

interface FilterSuggestionsProps {
  filters: string[];
  onFilterSelect: (filter: string) => void;
}

const FilterSuggestions: React.FC<FilterSuggestionsProps> = ({
  filters,
  onFilterSelect,
}) => {
  return (
    <div className="filter-suggestions">
      <h3>Filtros Gerados:</h3>
      <ul>
        {filters.map((filter, index) => (
          <li key={index}>
            <button onClick={() => onFilterSelect(filter)}>{filter}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSuggestions;
