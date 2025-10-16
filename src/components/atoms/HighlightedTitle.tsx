import React from 'react';

interface HighlightedTitleProps {
  title: string;
  searchTerm: string;
}

export const HighlightedTitle: React.FC<HighlightedTitleProps> = ({ title, searchTerm }) => {
  if (!searchTerm.trim()) {
    return <>{title}</>;
  }

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = title.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        if (part.toLowerCase() === searchTerm.toLowerCase()) {
          return (
            <span key={index} className="bg-yellow-300 font-bold text-[var(--primary-color)]">
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

