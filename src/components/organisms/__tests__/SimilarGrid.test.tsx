import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import type { Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SimilarGrid } from '../SimilarGrid';
import { FavoriteMoviesProvider } from '@/contexts/FavoriteMoviesContext';
import { SearchProvider } from '@/contexts/SearchContext';

const mockSimilarMovies = [
    { id: 2, title: 'Similar Movie 1', poster_path: '/test1.jpg', vote_average: 7.5, overview: 'Test overview 1', release_date: '2024-01-01' },
    { id: 3, title: 'Similar Movie 2', poster_path: '/test2.jpg', vote_average: 8.0, overview: 'Test overview 2', release_date: '2024-02-01' },
    { id: 4, title: 'Similar Movie 3', poster_path: '/test3.jpg', vote_average: 7.8, overview: 'Test overview 3', release_date: '2024-03-01' },
    { id: 5, title: 'Similar Movie 4', poster_path: '/test4.jpg', vote_average: 8.2, overview: 'Test overview 4', release_date: '2024-04-01' },
    { id: 6, title: 'Similar Movie 5', poster_path: '/test5.jpg', vote_average: 7.9, overview: 'Test overview 5', release_date: '2024-05-01' },
];

vi.mock('@/services/tmdbService', () => ({
    tmdbService: {
        getSimilarMovies: vi.fn(),
        getImagePath: (path: string) => `https://image.tmdb.org/t/p/w300${path}`,
    },
}));
import { tmdbService } from '@/services/tmdbService';

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

describe('SimilarGrid', () => {
    let consoleErrorSpy: any;
    beforeAll(() => {
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render loading state initially', () => {
        (tmdbService.getSimilarMovies as unknown as Mock).mockImplementation(() => new Promise(() => {}));

        renderWithProviders(<SimilarGrid movieId={1} />);

        expect(screen.getByText('Carregando filmes similares...')).toBeInTheDocument();
    });

    it('should render similar movies after loading', async () => {
        (tmdbService.getSimilarMovies as unknown as Mock).mockResolvedValue({ results: mockSimilarMovies });

        renderWithProviders(<SimilarGrid movieId={1} />);

        await waitFor(() => {
            expect(screen.getByText('Filmes Similares')).toBeInTheDocument();
        });

        expect(screen.getByText('Similar Movie 1')).toBeInTheDocument();
        expect(screen.getByText('Similar Movie 5')).toBeInTheDocument();
    });

    it('should display only 6 movies', async () => {
        const manyMovies = Array.from({ length: 10 }, (_, i) => ({
            id: i + 2,
            title: `Movie ${i + 1}`,
            poster_path: `/test${i}.jpg`,
            vote_average: 7.5,
            overview: `Overview ${i}`,
            release_date: '2024-01-01',
        }));
        (tmdbService.getSimilarMovies as unknown as Mock).mockResolvedValue({ results: manyMovies });

        renderWithProviders(<SimilarGrid movieId={1} />);

        await waitFor(() => {
            expect(screen.getByText('Filmes Similares')).toBeInTheDocument();
        });

        const movieBoxes = screen.getAllByAltText('Poster do filme');
        expect(movieBoxes).toHaveLength(6);
    });

    it('should not render when no similar movies found', async () => {
        (tmdbService.getSimilarMovies as unknown as Mock).mockResolvedValue({ results: [] });

        const { container } = renderWithProviders(<SimilarGrid movieId={1} />);

        await waitFor(() => {
            expect(container.firstChild).toBeNull();
        });
    });

    it('should handle errors gracefully', async () => {
        (tmdbService.getSimilarMovies as unknown as Mock).mockRejectedValue(new Error('API Error'));

        const { container } = renderWithProviders(<SimilarGrid movieId={1} />);

        await waitFor(() => {
            expect(container.firstChild).toBeNull();
        });
    });

    it('should call getSimilarMovies with correct movieId', async () => {
        (tmdbService.getSimilarMovies as unknown as Mock).mockResolvedValue({ results: mockSimilarMovies });

        renderWithProviders(<SimilarGrid movieId={123} />);

        await waitFor(() => {
            expect(tmdbService.getSimilarMovies).toHaveBeenCalledWith(123);
        });
    });

    it('should reload when movieId changes', async () => {
        (tmdbService.getSimilarMovies as unknown as Mock).mockResolvedValue({ results: mockSimilarMovies });

        const { rerender } = renderWithProviders(<SimilarGrid movieId={1} />);

        await waitFor(() => {
            expect(tmdbService.getSimilarMovies).toHaveBeenCalledWith(1);
        });

        (tmdbService.getSimilarMovies as unknown as Mock).mockClear();

        rerender(
            <BrowserRouter>
                <FavoriteMoviesProvider>
                    <SearchProvider>
                        <SimilarGrid movieId={2} />
                    </SearchProvider>
                </FavoriteMoviesProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(tmdbService.getSimilarMovies).toHaveBeenCalledWith(2);
        });
    });
});

