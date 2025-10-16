import React from 'react';

interface SearchResultsHeaderProps {
  searchTerm: string;
  totalResults: number;
}

export const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({ 
  searchTerm, 
  totalResults 
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-2">
        Resultados para: <span className="text-yellow-600">"{searchTerm}"</span>
      </h1>
      <p className="text-[var(--primary-color)]">
        Encontrados <span className="font-bold text-lg">{totalResults}</span> filme{totalResults !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

