import React, { useEffect, useState } from 'react';
import { tmdbService, type MoviePopularResults } from '@/services/tmdbService';
import { MovieBox } from '@/components/molecules/MovieBox';
import { Title } from '@/components/atoms/Title';

interface SimilarGridProps {
    movieId: number;
}

export const SimilarGrid: React.FC<SimilarGridProps> = ({ movieId }) => {
    const [similarMovies, setSimilarMovies] = useState<MoviePopularResults[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSimilarMovies = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await tmdbService.getSimilarMovies(movieId);
                setSimilarMovies(response.results?.slice(0, 6) || []);
            } catch (err) {
                console.error('Error loading similar movies:', err);
                setError('Erro ao carregar filmes similares');
                setSimilarMovies([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadSimilarMovies();
    }, [movieId]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <p className="text-[var(--primary-color)]">Carregando filmes similares...</p>
            </div>
        );
    }

    if (error || similarMovies.length === 0) {
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

