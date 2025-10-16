import React, { createContext, useContext, useState } from 'react';
import { type MovieByIdResponse, type MoviePopularResults } from '@/services/tmdbService';

type FavoriteMovie = MovieByIdResponse | MoviePopularResults;

interface FavoriteMoviesContextType {
    favoriteMovies: FavoriteMovie[];
    addMovie: (movie: FavoriteMovie) => void;
    removeMovie: (movieId: number) => void;
    isFavorite: (movieId: number) => boolean;
    clearAll: () => void;
}

const FavoriteMoviesContext = createContext<FavoriteMoviesContextType | undefined>(undefined);

export const FavoriteMoviesProvider: React.FC<{children: React.ReactNode }> = ({children}) => {
const [favoriteMovies, setFavoriteMovies] = useState<MovieByIdResponse[]>([]);

  const addMovie = (movie: MovieByIdResponse) => {
    const exists = favoriteMovies.some((m: MovieByIdResponse) => m.id === movie.id);
    if (!exists) {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  const removeMovie = (movieId: number) => {
    setFavoriteMovies(favoriteMovies.filter((m) => m.id !== movieId));
  };

  const isFavorite = (movieId: number) => {
    return favoriteMovies.some((m) => m.id === movieId);
  };

  const clearAll = () => {
    setFavoriteMovies([]);
  };

  const value: FavoriteMoviesContextType = {
    favoriteMovies,
    addMovie,
    removeMovie,
    isFavorite,
    clearAll,
  };

  return (
    <FavoriteMoviesContext.Provider value={value}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
}

export const useFavoriteMovies = () => {
  const context = useContext(FavoriteMoviesContext);
  if (!context) {
    throw new Error(
      'useFavoriteMovies deve ser usado dentro de FavoriteMoviesProvider'
    );
  }
  return context;
}