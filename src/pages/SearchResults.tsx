import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@/contexts/SearchContext';
import { tmdbService } from '@/services/tmdbService';
import { SearchResultsHeader } from '@/components/organisms/SearchResultsHeader';
import { Pagination } from '@/components/organisms/Pagination';
import { MovieBox } from '@/components/molecules/MovieBox';
import { EmptyState } from '@/components/atoms/EmptyState';

export const SearchResults: React.FC = () => {
    const { searchTerm } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ['searchMovies', searchTerm, currentPage],
        queryFn: () => tmdbService.searchMovies(searchTerm, currentPage),
        enabled: !!searchTerm.trim(),
        staleTime: 1000 * 60 * 5,
    });

    const movies = data?.results || [];
    const totalResults = data?.total_results || 0;
    const totalPages = data?.total_pages || 0;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-8 auto-rows-max">
                            {movies.map((movie) => (
                                <MovieBox key={movie.id} movie={movie} variant="search" />
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            isLoading={isLoading}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
