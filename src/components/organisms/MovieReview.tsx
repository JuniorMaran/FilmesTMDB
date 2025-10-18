import React, { useEffect, useState } from 'react';
import { tmdbService, type MovieReviewResult } from '@/services/tmdbService';
import { ReviewCard } from '@/components/molecules/ReviewCard';
import { Title } from '../atoms/Title';

interface MovieReviewProps {
    movieId: number;
}

export const MovieReview: React.FC<MovieReviewProps> = ({ movieId }) => {
    const [reviews, setReviews] = useState<MovieReviewResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await tmdbService.getMovieReviews(movieId);
                 setReviews(response.results?.slice(0, 3) || []);
            } catch (err) {
                console.error('Error loading reviews:', err);
                setError('Erro ao carregar avaliações');
                setReviews([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadReviews();
    }, [movieId]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <p className="text-[var(--primary-color)]">Carregando avaliações...</p>
            </div>
        );
    }

    if (error || reviews.length === 0) {
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

