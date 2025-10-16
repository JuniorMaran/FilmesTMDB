import React, { createContext, useContext, useState, useEffect } from 'react';
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
const STORAGE_KEY = 'favoriteMovies';

export const FavoriteMoviesProvider: React.FC<{children: React.ReactNode }> = ({children}) => {
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(STORAGE_KEY);
      if (storedFavorites) {
        const parsed = JSON.parse(storedFavorites);
        setFavoriteMovies(parsed);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos do localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteMovies));
      } catch (error) {
        console.error('Erro ao salvar favoritos no localStorage:', error);
      }
    }
  }, [favoriteMovies, isLoaded]);

  const addMovie = (movie: FavoriteMovie) => {
    const exists = favoriteMovies.some((m: FavoriteMovie) => m.id === movie.id);
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