import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';
import { SearchProvider } from '@/contexts/SearchContext';

describe('Header', () => {
  const renderWithProviders = (ui: React.ReactElement) =>
    render(
      <MemoryRouter>
        <SearchProvider>{ui}</SearchProvider>
      </MemoryRouter>
    );

  it('renderiza logo, input de busca e botoes de pagina', () => {
    renderWithProviders(<Header />);
    expect(screen.getByAltText('TMDB Logo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar filme...')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
  });
});

