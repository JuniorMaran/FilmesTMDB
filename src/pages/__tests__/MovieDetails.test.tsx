import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { FavoriteMoviesProvider } from '@/contexts/FavoriteMoviesContext';
import { MovieDetails } from '../MovieDetails';

vi.mock('@/services/tmdbService', () => ({
  tmdbService: {
    getMovieById: vi.fn(),
    getImagePath: (p: string, s: string) => `https://image.tmdb.org/t/p/${s}${p}`,
  },
}));

vi.mock('@/components/organisms/SimilarGrid', () => ({
  SimilarGrid: () => <div>SimilarGrid</div>,
}));

vi.mock('@/components/organisms/MovieReview', () => ({
  MovieReview: () => <div>MovieReview</div>,
}));

import { tmdbService } from '@/services/tmdbService';

const renderWithRouter = (initialPath: string) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <FavoriteMoviesProvider>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </FavoriteMoviesProvider>
    </MemoryRouter>
  );

describe('MovieDetails (smoke)', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renderiza detalhes do filme', async () => {
    (tmdbService.getMovieById as any).mockResolvedValue({
      id: 1,
      title: 'Matrix',
      backdrop_path: '/back.jpg',
      poster_path: '/post.jpg',
      genres: [{ name: 'Action' }],
      release_date: '1999-03-31',
      vote_average: 8.7,
      overview: 'Sci-fi classic',
    });

    renderWithRouter('/movie/1');

    await waitFor(() => {
      expect(screen.getByText('Matrix')).toBeInTheDocument();
    });

    expect(screen.getByText('MovieReview')).toBeInTheDocument();
    expect(screen.getByText('SimilarGrid')).toBeInTheDocument();
  });
});

