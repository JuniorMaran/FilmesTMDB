import React from 'react';

interface RatingTagProps {
    rating: number;
}

export const RatingTag: React.FC<RatingTagProps> = ({ rating }) => {
    let ratingClass;

    
    if (rating < 5) {
        ratingClass = 'bg-red-400';
    } else if (rating >= 5.1 && rating < 8.0 ) {
        ratingClass = 'bg-yellow-400';
    } else if (rating > 8.0) {
        ratingClass = 'bg-green-400';
    } else if (rating === 0) {
        ratingClass = 'bg-gray-400';
    }
    
    return (
        <span className={`w-fit inline-block rounded-full px-2 text-sm font-semibold ${ratingClass} text-[var(--primary-color)]`}>
            {rating?.toFixed(1)}
        </span>
    );
};