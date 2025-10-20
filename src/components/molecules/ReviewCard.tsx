import React from 'react';
import { type MovieReviewResult } from '@/services/tmdbService';
import { Avatar } from '@/components/atoms/Avatar';
import { formatDate } from '@/utils/dateUtils';

interface ReviewCardProps {
    review: MovieReviewResult;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div
            key={review.id}
            className="bg-white rounded-lg p-6 shadow-md border-l-4 border-[var(--primary-color)] max-w-[500px]"
        >
            <div className="flex gap-1.5 items-start mb-3">
                <Avatar image={review.author_details.avatar_path} />
                <div>
                    <p className="font-bold text-[var(--primary-color)]">{review.author}</p>
                    <p className="text-xs text-gray-500">
                        {formatDate(review.created_at, 'DD/MM/YYYY')}
                    </p>
                </div>
                {review.rating && (
                    <div className="bg-[var(--primary-color)] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        {review.rating}
                    </div>
                )}
            </div>
            <p className="text-gray-700 line-clamp-4">{review.content}</p>
            <a
                href={review.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary-color)] text-sm font-semibold mt-3 inline-block hover:underline"
            >
                Ler avaliação completa
            </a>
        </div>
    );
};
