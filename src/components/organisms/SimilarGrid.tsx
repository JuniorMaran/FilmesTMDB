import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { tmdbService, type MoviePopularResults } from '@/services/tmdbService';
import { MovieBox } from '@/components/molecules/MovieBox';
import { Title } from '@/components/atoms/Title';

interface SimilarGridProps {
    movieId: number;
}

type SimilarResponse = { results: MoviePopularResults[]; total_results?: number; total_pages?: number; page?: number };

export const SimilarGrid: React.FC<SimilarGridProps> = ({ movieId }) => {
    const { data } = useSuspenseQuery<SimilarResponse>({
        queryKey: ['similarMovies', movieId],
        queryFn: () => tmdbService.getSimilarMovies(movieId),
        staleTime: 1000 * 60 * 5,
    });

    const similarMovies = data?.results?.slice(0, 6) ?? [];

    if (!similarMovies.length) {
        return null;
    }

    return (
        <div className="my-10 mx-10 lg:mx-24">
            <Title title="Filmes Similares" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 overflow-visible">
                {similarMovies.map((movie) => (
                    <MovieBox key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

