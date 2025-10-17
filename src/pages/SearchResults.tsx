import React, { useEffect, useState } from 'react';
import { useSearch } from '@/contexts/SearchContext';
import { tmdbService, type MoviePopularResults } from '@/services/tmdbService';
import { SearchResultsHeader } from '@/components/organisms/SearchResultsHeader';
import { MovieBox } from '@/components/molecules/MovieBox';
import { EmptyState } from '@/components/atoms/EmptyState';

export const SearchResults: React.FC = () => {
    const { searchTerm } = useSearch();
    const [movies, setMovies] = useState<MoviePopularResults[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const loadSearchResults = async (page: number = 1) => {
        if (!searchTerm.trim()) return;

        try {
            setIsLoading(true);
            const response = await tmdbService.searchMovies(searchTerm, page);
            setMovies(response.results || []);
            setTotalResults(response.total_results || 0);
            setTotalPages(response.total_pages || 0);
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error searching movies:', error);
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        loadSearchResults(1);
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mb-8 auto-rows-max">
                            {movies.map((movie) => (
                                <MovieBox key={movie.id} movie={movie} variant="search" />
                            ))}
                        </div>

                        {/* Paginação */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-8 mb-8">
                                <button
                                    onClick={() => loadSearchResults(currentPage - 1)}
                                    disabled={currentPage === 1 || isLoading}
                                    className="px-4 py-2 bg-[var(--primary-color)] text-[var(--secundary-color)] rounded-md hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    ← Anterior
                                </button>

                                <div className="flex items-center gap-2">
                                    <span className="text-[var(--secundary-color)]">
                                        Página {currentPage} de {totalPages}
                                    </span>
                                </div>

                                <button
                                    onClick={() => loadSearchResults(currentPage + 1)}
                                    disabled={currentPage === totalPages || isLoading}
                                    className="px-4 py-2 bg-[var(--primary-color)] text-[var(--secundary-color)] rounded-md hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Próxima →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
