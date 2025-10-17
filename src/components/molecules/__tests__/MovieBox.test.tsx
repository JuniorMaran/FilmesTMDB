import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MovieBox } from '../MovieBox';
import { FavoriteMoviesProvider } from '@/contexts/FavoriteMoviesContext';
import { SearchProvider } from '@/contexts/SearchContext';

vi.mock('@/services/tmdbService', () => ({
  tmdbService: {
    getImagePath: (path: string) => `https://image.tmdb.org/t/p/w300${path}`,
  },
}));

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  vote_average: 8.5,
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <FavoriteMoviesProvider>
        <SearchProvider>
          {component}
        </SearchProvider>
      </FavoriteMoviesProvider>
    </BrowserRouter>
  );
};

describe('MovieBox', () => {
  describe('Default Variant', () => {
    it('should render movie with favorite button', () => {
      renderWithProviders(<MovieBox movie={mockMovie} />);

      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      expect(screen.getByAltText('Poster do filme')).toBeInTheDocument();
    });

    it('should render link to movie details', () => {
      const { container } = renderWithProviders(<MovieBox movie={mockMovie} />);

      const link = container.querySelector('a[href="/movie/1"]');
      expect(link).toBeInTheDocument();
    });

    it('should render rating tag', () => {
      renderWithProviders(<MovieBox movie={mockMovie} />);

      expect(screen.getByText('8.5')).toBeInTheDocument();
    });

    it('should have favorite button', () => {
      const { container } = renderWithProviders(<MovieBox movie={mockMovie} />);

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Favorite Variant', () => {
    it('should render movie with delete button', () => {
      const { container } = renderWithProviders(
        <MovieBox movie={mockMovie} variant="favorite" />
      );

      const deleteButton = container.querySelector('.bg-red-500');
      expect(deleteButton).toBeInTheDocument();
    });

    it('should have delete button with correct styling', () => {
      const { container } = renderWithProviders(
        <MovieBox movie={mockMovie} variant="favorite" />
      );

      const deleteButton = container.querySelector('.bg-red-500.hover\\:bg-red-600');
      expect(deleteButton).toBeInTheDocument();
    });

    it('should render movie title and rating', () => {
      renderWithProviders(<MovieBox movie={mockMovie} variant="favorite" />);

      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      expect(screen.getByText('8.5')).toBeInTheDocument();
    });
  });

  describe('Search Variant', () => {
    it('should render movie with highlighted title', () => {
      renderWithProviders(
        <MovieBox movie={mockMovie} variant="search" />
      );

      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    it('should render favorite button in search variant', () => {
      const { container } = renderWithProviders(
        <MovieBox movie={mockMovie} variant="search" />
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('should render rating tag in search variant', () => {
      renderWithProviders(
        <MovieBox movie={mockMovie} variant="search" />
      );

      expect(screen.getByText('8.5')).toBeInTheDocument();
    });
  });

  describe('Common Features', () => {
    it('should render poster image for all variants', () => {
      const { rerender } = renderWithProviders(<MovieBox movie={mockMovie} />);

      expect(screen.getByAltText('Poster do filme')).toBeInTheDocument();

      rerender(
        <BrowserRouter>
          <FavoriteMoviesProvider>
            <SearchProvider>
              <MovieBox movie={mockMovie} variant="favorite" />
            </SearchProvider>
          </FavoriteMoviesProvider>
        </BrowserRouter>
      );

      expect(screen.getByAltText('Poster do filme')).toBeInTheDocument();
    });

    it('should have correct card styling', () => {
      const { container } = renderWithProviders(<MovieBox movie={mockMovie} />);

      const card = container.querySelector('.bg-\\[var\\(--primary-color\\)\\]');
      expect(card).toBeInTheDocument();
    });

    it('should truncate long titles', () => {
      const longTitleMovie = {
        ...mockMovie,
        title: 'This is a very long movie title that should be truncated',
      };

      renderWithProviders(<MovieBox movie={longTitleMovie} />);

      const titleElement = screen.getByTitle('This is a very long movie title that should be truncated');
      expect(titleElement).toHaveClass('line-clamp-2');
    });
  });
});

