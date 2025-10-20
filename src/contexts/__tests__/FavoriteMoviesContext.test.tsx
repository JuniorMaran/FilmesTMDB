import { describe, it, expect, beforeEach } from '@jest/globals';

import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteMoviesProvider, useFavoriteMovies } from '@/contexts/FavoriteMoviesContext';

const DummyMovie = {
  id: 1,
  title: 'Movie 1',
  poster_path: '/p.jpg',
  vote_average: 8.3,
  overview: 'Overview',
  release_date: '2024-01-01',
};

const Consumer: React.FC = () => {
  const { favoriteMovies, addMovie, removeMovie, isFavorite, clearAll } = useFavoriteMovies();
  return (
    <div>
      <div data-testid="count">{favoriteMovies.length}</div>
      <div data-testid="flag">{isFavorite(1) ? 'yes' : 'no'}</div>
      <button onClick={() => addMovie(DummyMovie as any)}>add</button>
      <button onClick={() => removeMovie(1)}>remove</button>
      <button onClick={() => clearAll()}>clear</button>
    </div>
  );
};

describe('FavoriteMoviesContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adiciona e remove favoritos; clearAll limpa a lista', () => {
    render(
      <FavoriteMoviesProvider>
        <Consumer />
      </FavoriteMoviesProvider>
    );

    const count = () => screen.getByTestId('count').textContent;
    const flag = () => screen.getByTestId('flag').textContent;

    // Inicialmente vazio
    expect(count()).toBe('0');
    expect(flag()).toBe('no');

    // Adiciona
    fireEvent.click(screen.getByText('add'));
    expect(count()).toBe('1');
    expect(flag()).toBe('yes');

    // Remove
    fireEvent.click(screen.getByText('remove'));
    expect(count()).toBe('0');
    expect(flag()).toBe('no');

    // Adiciona de novo e limpa
    fireEvent.click(screen.getByText('add'));
    fireEvent.click(screen.getByText('clear'));
    expect(count()).toBe('0');
  });
});

