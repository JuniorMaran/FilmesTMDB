import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Favorites } from '../Favorites';
import { FavoriteMoviesProvider } from '@/contexts/FavoriteMoviesContext';

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <BrowserRouter>
      <FavoriteMoviesProvider>{ui}</FavoriteMoviesProvider>
    </BrowserRouter>
  );

describe('Favorites (smoke)', () => {
  it('renderiza estado vazio quando não há favoritos', () => {
    renderWithProviders(<Favorites />);
    expect(screen.getByText('Nenhum filme favorito ainda')).toBeInTheDocument();
  });
});

