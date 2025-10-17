import React, { useMemo, useState } from 'react';
import { useFavoriteMovies } from '@/contexts/FavoriteMoviesContext';
import { MovieBox } from '@/components/molecules/MovieBox';
import { Filter, type SortOption } from '@/components/organisms/Filter';
import { EmptyState } from '@/components/atoms/EmptyState';

export const Favorites: React.FC = () => {
  const { favoriteMovies } = useFavoriteMovies();
  const [sortBy, setSortBy] = useState<SortOption>('title-asc');

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

  return (
    <div className="flex flex-col mx-auto w-full">
      <div className="m-10">
        <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-6">Meus Favoritos</h1>

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
            <Filter
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalItems={favoriteMovies.length}
              itemLabel="filme"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 auto-rows-max">
              {sortedMovies.map((movie) => (
                <MovieBox key={movie.id} movie={movie} variant="favorite" />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};