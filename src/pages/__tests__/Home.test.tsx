import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home } from '../Home';
import { FavoriteMoviesProvider } from '@/contexts/FavoriteMoviesContext';
import { SearchProvider } from '@/contexts/SearchContext';

vi.mock('@/services/tmdbService', () => ({
  tmdbService: {
    getMoviePopular: vi.fn(),
    getImagePath: (p: string, s: string) => `https://image.tmdb.org/t/p/${s}${p}`,
  },
}));
import { tmdbService } from '@/services/tmdbService';

const renderWithProviders = (ui: React.ReactElement) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <FavoriteMoviesProvider>
          <SearchProvider>{ui}</SearchProvider>
        </FavoriteMoviesProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('Home (smoke)', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renderiza ttulo e filmes populares', async () => {
    (tmdbService.getMoviePopular as any).mockResolvedValue({
      results: [
        { id: 1, title: 'Movie A', poster_path: '/a.jpg', vote_average: 7.1, overview: '...', release_date: '2024-01-01' },
      ],
      total_pages: 1,
    });

    renderWithProviders(<Home />);

    expect(screen.getByText('Filmes Populares')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Movie A')).toBeInTheDocument();
    });
  });
});

