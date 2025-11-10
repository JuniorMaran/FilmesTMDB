import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { tmdbService, type MovieReviewResult } from '@/services/tmdbService';
import { ReviewCard } from '@/components/molecules/ReviewCard';
import { Title } from '../atoms/Title';

interface MovieReviewProps {
    movieId: number;
}

type ReviewsResponse = { results: MovieReviewResult[]; total_results?: number; total_pages?: number; page?: number };

export const MovieReview: React.FC<MovieReviewProps> = ({ movieId }) => {
    const { data } = useSuspenseQuery<ReviewsResponse>({
        queryKey: ['movieReviews', movieId],
        queryFn: () => tmdbService.getMovieReviews(movieId),
        staleTime: 1000 * 60 * 5,
    });

    const reviews = data?.results?.slice(0, 3) ?? [];

    if (!reviews.length) {
        return null;
    }

    return (
        <div className="my-10 mx-10 lg:mx-24">
            <Title title="Avaliações" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};

