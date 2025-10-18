import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { FavoriteMoviesProvider, useFavoriteMovies } from '../FavoriteMoviesContext';
import { type MoviePopularResults } from '@/services/tmdbService';

const mockMovie: MoviePopularResults = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  vote_average: 8.5,
  overview: 'This is a test movie',
  release_date: '2024-01-01',
};

function TestComponent() {
  const { favoriteMovies, addMovie, removeMovie, isFavorite, clearAll } = useFavoriteMovies();

  return (
    <div>
      <div data-testid="favorites-count">{favoriteMovies.length}</div>
      <button onClick={() => addMovie(mockMovie)} data-testid="add-btn">
        Add
      </button>
      <button onClick={() => removeMovie(mockMovie.id)} data-testid="remove-btn">
        Remove
      </button>
      <button onClick={() => clearAll()} data-testid="clear-btn">
        Clear
      </button>
      <div data-testid="is-favorite">{isFavorite(mockMovie.id) ? 'true' : 'false'}</div>
    </div>
  );
}

describe('FavoriteMoviesContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add a movie to favorites', async () => {
    render(
      <FavoriteMoviesProvider>
        <TestComponent />
      </FavoriteMoviesProvider>
    );

    const addBtn = screen.getByTestId('add-btn');
    const count = screen.getByTestId('favorites-count');

    expect(count).toHaveTextContent('0');
    await act(async () => {
      addBtn.click();
    });
    expect(count).toHaveTextContent('1');
  });

  it('should remove a movie from favorites', async () => {
    render(
      <FavoriteMoviesProvider>
        <TestComponent />
      </FavoriteMoviesProvider>
    );

    const addBtn = screen.getByTestId('add-btn');
    const removeBtn = screen.getByTestId('remove-btn');
    const count = screen.getByTestId('favorites-count');

    await act(async () => {
      addBtn.click();
    });
    expect(count).toHaveTextContent('1');
    await act(async () => {
      removeBtn.click();
    });
    expect(count).toHaveTextContent('0');
  });

  it('should check if a movie is favorite', async () => {
    render(
      <FavoriteMoviesProvider>
        <TestComponent />
      </FavoriteMoviesProvider>
    );

    const addBtn = screen.getByTestId('add-btn');
    const isFavorite = screen.getByTestId('is-favorite');

    expect(isFavorite).toHaveTextContent('false');
    await act(async () => {
      addBtn.click();
    });
    expect(isFavorite).toHaveTextContent('true');
  });

  it('should clear all favorites', async () => {
    render(
      <FavoriteMoviesProvider>
        <TestComponent />
      </FavoriteMoviesProvider>
    );

    const addBtn = screen.getByTestId('add-btn');
    const clearBtn = screen.getByTestId('clear-btn');
    const count = screen.getByTestId('favorites-count');

    await act(async () => {
      addBtn.click();
    });
    expect(count).toHaveTextContent('1');
    await act(async () => {
      clearBtn.click();
    });
    expect(count).toHaveTextContent('0');
  });

  it('should not add duplicate movies', async () => {
    render(
      <FavoriteMoviesProvider>
        <TestComponent />
      </FavoriteMoviesProvider>
    );

    const addBtn = screen.getByTestId('add-btn');
    const count = screen.getByTestId('favorites-count');

    await act(async () => {
      addBtn.click();
      addBtn.click();
    });
    expect(count).toHaveTextContent('1');
  });

  it('should persist favorites to localStorage', async () => {
    render(
      <FavoriteMoviesProvider>
        <TestComponent />
      </FavoriteMoviesProvider>
    );

    const addBtn = screen.getByTestId('add-btn');
    await act(async () => {
      addBtn.click();
    });

    const stored = localStorage.getItem('favoriteMovies');
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!)).toHaveLength(1);
  });
});

