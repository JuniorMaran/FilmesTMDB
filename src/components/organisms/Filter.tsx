import React from 'react';

export type SortOption = 'title-asc' | 'title-desc' | 'rating-desc' | 'rating-asc';

interface FilterProps {
  sortBy: SortOption;
  onSortChange: (sortOption: SortOption) => void;
  totalItems: number;
  itemLabel?: string;
}

export const Filter: React.FC<FilterProps> = ({
  sortBy,
  onSortChange,
  totalItems,
  itemLabel = 'filme'
}) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <label className="text-[var(--primary-color)] font-semibold">Ordenar por:</label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="px-4 py-2 rounded-md bg-[var(--primary-color)] text-[var(--secundary-color)] border border-[var(--secundary-color)] cursor-pointer hover:bg-opacity-80 transition-all"
      >
        <option value="title-asc">Título (A-Z)</option>
        <option value="title-desc">Título (Z-A)</option>
        <option value="rating-desc">Nota (Maior-Menor)</option>
        <option value="rating-asc">Nota (Menor-Maior)</option>
      </select>
      <span className="text-[var(--primary-color)] text-sm">
        Total: {totalItems} {itemLabel}{totalItems !== 1 ? 's' : ''}
      </span>
    </div>
  );
};
