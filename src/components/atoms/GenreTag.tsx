import React from 'react';

interface GenreTagProps {
    genre: string;
}

export const GenreTag: React.FC<GenreTagProps> = ({ genre }) => {
    return (
        <span className="px-2 py-1 text-xs font-semibold text-white bg-[var(--primary-color)] rounded-full mr-1 mb-1">
            {genre}
        </span>
    );
};
