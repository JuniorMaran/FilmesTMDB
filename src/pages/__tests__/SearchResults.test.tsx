import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { FavoriteMoviesProvider } from '@/contexts/FavoriteMoviesContext';
import { SearchResults } from '../SearchResults';

vi.mock('@/contexts/SearchContext', () => ({
  useSearch: () => ({ searchTerm: 'Matrix', setSearchTerm: () => {} }),
}));

vi.mock('@/services/tmdbService', () => ({
  tmdbService: {
    searchMovies: vi.fn(),
    getImagePath: (p: string, s: string) => `https://image.tmdb.org/t/p/${s}${p}`,
  },
}));
import { tmdbService } from '@/services/tmdbService';

const renderWithProviders = (ui: React.ReactElement) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <FavoriteMoviesProvider>{ui}</FavoriteMoviesProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('SearchResults (smoke)', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renderiza resultados quando houver termo de busca', async () => {
    (tmdbService.searchMovies as any).mockResolvedValue({
      results: [
        { id: 1, title: 'Matrix', poster_path: '/a.jpg', vote_average: 8.7, overview: '...', release_date: '1999-03-31' },
        { id: 2, title: 'Matrix Reloaded', poster_path: '/b.jpg', vote_average: 7.0, overview: '...', release_date: '2003-05-15' },
      ],
      total_results: 2,
      total_pages: 1,
    });

    renderWithProviders(<SearchResults />);

    await waitFor(() => {
      expect(screen.getByText(/Resultados para/)).toBeInTheDocument();
    });

    const highlights = await screen.findAllByText('Matrix');
    expect(highlights.length).toBeGreaterThanOrEqual(2);
    expect(await screen.findByTitle('Matrix Reloaded')).toBeInTheDocument();
  });
});

