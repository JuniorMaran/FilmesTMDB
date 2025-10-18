import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  isLoading = false,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8 mb-8">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1 || isLoading}
        className="px-4 py-2 bg-[var(--primary-color)] text-[var(--secundary-color)] rounded-md hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Página anterior"
      >
        Anterior
      </button>

      <div className="flex items-center gap-2">
        <span className="text-[var(--primary-color)]">
          Página {currentPage} de {totalPages}
        </span>
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages || isLoading}
        className="px-4 py-2 bg-[var(--primary-color)] text-[var(--secundary-color)] rounded-md hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Próxima página"
      >
        Próxima
      </button>
    </div>
  );
};

