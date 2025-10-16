import React, { useEffect, useState } from 'react';
import { useSearch } from '@/contexts/SearchContext';
import { tmdbService, type MoviePopularResults } from '@/services/tmdbService';
import { SearchResultsHeader } from '@/components/organisms/SearchResultsHeader';
import { SearchMovieBox } from '@/components/molecules/SearchMovieBox';
import { EmptyState } from '@/components/atoms/EmptyState';

export const SearchResults: React.FC = () => {
    const { searchTerm } = useSearch();
    const [movies, setMovies] = useState<MoviePopularResults[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);

    const loadSearchResults = async () => {
        if (!searchTerm.trim()) return;

        try {
            setIsLoading(true);
            const response = await tmdbService.searchMovies(searchTerm);
            setMovies(response.results || []);
            setTotalResults(response.total_results || 0);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error searching movies:', error);
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadSearchResults();
        // eslint-disable-next-line
    }, [searchTerm]);

    if (!searchTerm.trim()) {
        return (
            <div className="flex flex-col mx-auto w-full">
                <div className="m-10">
                    <EmptyState
                        title="Nenhuma busca realizada"
                        description="Use a barra de busca no topo para procurar filmes!"
                        icon="🔍"
                        buttonText="Voltar para Home"
                        buttonLink="/"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col mx-auto w-full">
            <div className="m-10">
                <SearchResultsHeader searchTerm={searchTerm} totalResults={totalResults} />

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <p className="text-[var(--primary-color)]">Carregando resultados...</p>
                    </div>
                ) : movies.length === 0 ? (
                    <EmptyState
                        title="Nenhum filme encontrado"
                        description={`Nenhum resultado para "${searchTerm}". Tente outro termo de busca!`}
                        icon="🎬"
                        buttonText="Explorar Filmes"
                        buttonLink="/"
                    />
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 mb-8">
                            {movies.map((movie) => (
                                <SearchMovieBox key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
