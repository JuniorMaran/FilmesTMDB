import React, { useMemo, useState } from 'react';

import { useFavoriteMovies } from '@/contexts/FavoriteMoviesContext';
import { MovieBox } from '@/components/molecules/MovieBox';
import { Filter, type SortOption } from '@/components/organisms/Filter';
import { EmptyState } from '@/components/atoms/EmptyState';
import { Pagination } from '@/components/organisms/Pagination';
import { Title } from '@/components/atoms/Title';

export const Favorites: React.FC = () => {
    const { favoriteMovies, clearAll } = useFavoriteMovies();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<SortOption>('title-asc');

    const moviesPerPage = 20;
    const totalPages = Math.ceil(favoriteMovies.length / moviesPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRemoveAllFavorites = () => {
        setCurrentPage(1);
        clearAll();
    };

    const sortedMovies = useMemo(() => {
        const movies = [...favoriteMovies];
        switch (sortBy) {
            case 'title-asc':
                return movies.sort((a, b) => a.title.localeCompare(b.title));
            case 'title-desc':
                return movies.sort((a, b) => b.title.localeCompare(a.title));
            case 'rating-desc':
                return movies.sort((a, b) => b.vote_average - a.vote_average);
            case 'rating-asc':
                return movies.sort((a, b) => a.vote_average - b.vote_average);
            default:
                return movies;
        }
    }, [favoriteMovies, sortBy]);

    const paginatedMovies = useMemo(() => {
        const startIndex = (currentPage - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        return sortedMovies.slice(startIndex, endIndex);
    }, [sortedMovies, currentPage, moviesPerPage]);

    return (
        <>
            <div className="w-full px-4 sm:px-8 lg:px-20 py-8">
                {favoriteMovies.length === 0 ? (
                    <EmptyState
                        title="Nenhum filme favorito ainda"
                        description="Adicione filmes aos seus favoritos para vê-los aqui!"
                        icon="❤️"
                        buttonText="Explorar Filmes"
                        buttonLink="/"
                    />
                ) : (
                    <>
                        <Title title="Meus Favoritos" />
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                            <Filter
                                sortBy={sortBy}
                                onSortChange={setSortBy}
                                totalItems={favoriteMovies.length}
                                itemLabel="filme"
                            />
                            <button
                                onClick={handleRemoveAllFavorites}
                                className="w-full sm:w-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition-colors"
                                title="Remover todos os favoritos"
                            >
                                Remover Todos
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 mb-8 auto-rows-max overflow-visible">
                            {paginatedMovies.map((movie) => (
                                <MovieBox key={movie.id} movie={movie} variant="favorite" />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </>
    );
};
