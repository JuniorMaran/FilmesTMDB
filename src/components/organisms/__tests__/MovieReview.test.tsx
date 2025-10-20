import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import type { Mock } from 'vitest';
import { tmdbService } from '@/services/tmdbService';
import { render, screen, waitFor } from '@testing-library/react';
import { MovieReview } from '../MovieReview';

const mockReviews = [
    {
        id: '1',
        author: 'John Doe',
        content: 'This is a great movie!',
        created_at: '2024-01-01T10:00:00.000Z',
        rating: 8,
        url: 'https://example.com/review/1',
        author_details: {
            avatar_path: '/avatar1.jpg',
        },
    },
    {
        id: '2',
        author: 'Jane Smith',
        content: 'Amazing cinematography and storytelling.',
        created_at: '2024-01-02T10:00:00.000Z',
        rating: 9,
        url: 'https://example.com/review/2',
        author_details: {
            avatar_path: '/avatar2.jpg',
        },
    },
    {
        id: '3',
        author: 'Bob Johnson',
        content: 'Not bad, but could be better.',
        created_at: '2024-01-03T10:00:00.000Z',
        rating: 6,
        url: 'https://example.com/review/3',
            author_details: {
            avatar_path: '/avatar3.jpg',
        },
    },
];

vi.mock('@/services/tmdbService', () => ({
    tmdbService: {
        getMovieReviews: vi.fn(),
        getImagePath: (path: string, size: string) => `https://image.tmdb.org/t/p/${size}${path}`,
    },
}));

vi.mock('@/utils/dateUtils', () => ({
    formatDate: (date: string) => new Date(date).toLocaleDateString('pt-BR'),
}));

describe('MovieReview', () => {
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
        (tmdbService.getMovieReviews as unknown as Mock).mockImplementation(
            () => new Promise(() => {})
        );

        render(<MovieReview movieId={1} />);

        expect(screen.getByText('Carregando avaliações...')).toBeInTheDocument();
    });

    it('should render reviews after loading', async () => {
        (tmdbService.getMovieReviews as unknown as Mock).mockResolvedValue({
            results: mockReviews,
        });

        render(<MovieReview movieId={1} />);

        await waitFor(() => {
            expect(screen.getByText('Avaliações')).toBeInTheDocument();
        });

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    it('should display only 3 reviews', async () => {
        const manyReviews = Array.from({ length: 10 }, (_, i) => ({
            id: String(i + 1),
            author: `Author ${i + 1}`,
            content: `Review content ${i + 1}`,
            created_at: '2024-01-01T10:00:00.000Z',
            rating: 7,
            url: `https://example.com/review/${i + 1}`,
            author_details: { avatar_path: `/avatar${i + 1}.jpg` },
        }));
        (tmdbService.getMovieReviews as unknown as Mock).mockResolvedValue({
            results: manyReviews,
        });

        render(<MovieReview movieId={1} />);

        await waitFor(() => {
            expect(screen.getByText('Avaliações')).toBeInTheDocument();
        });

        const reviewAuthors = screen.getAllByText(/Author \d+/);
        expect(reviewAuthors).toHaveLength(3);
    });

    it('should not render when no reviews found', async () => {
        (tmdbService.getMovieReviews as unknown as Mock).mockResolvedValue({ results: [] });

        const { container } = render(<MovieReview movieId={1} />);

        await waitFor(() => {
            expect(container.firstChild).toBeNull();
        });
    });

    it('should handle errors gracefully', async () => {
        (tmdbService.getMovieReviews as unknown as Mock).mockRejectedValue(new Error('API Error'));

        const { container } = render(<MovieReview movieId={1} />);

        await waitFor(() => {
            expect(container.firstChild).toBeNull();
        });
    });

    it('should call getMovieReviews with correct movieId', async () => {
        (tmdbService.getMovieReviews as unknown as Mock).mockResolvedValue({
            results: mockReviews,
        });

        render(<MovieReview movieId={123} />);

        await waitFor(() => {
            expect(tmdbService.getMovieReviews).toHaveBeenCalledWith(123);
        });
    });

    it('should reload when movieId changes', async () => {
        (tmdbService.getMovieReviews as unknown as Mock).mockResolvedValue({
            results: mockReviews,
        });

        const { rerender } = render(<MovieReview movieId={1} />);

        await waitFor(() => {
            expect(tmdbService.getMovieReviews).toHaveBeenCalledWith(1);
        });

        (tmdbService.getMovieReviews as unknown as Mock).mockClear();

        rerender(<MovieReview movieId={2} />);

        await waitFor(() => {
            expect(tmdbService.getMovieReviews).toHaveBeenCalledWith(2);
        });
    });

    it('should display review ratings when available', async () => {
        (tmdbService.getMovieReviews as unknown as Mock).mockResolvedValue({
            results: mockReviews,
        });

        render(<MovieReview movieId={1} />);

        await waitFor(() => {
            expect(screen.getByText('8')).toBeInTheDocument();
            expect(screen.getByText('9')).toBeInTheDocument();
            expect(screen.getByText('6')).toBeInTheDocument();
        });
    });

    it('should have links to full reviews', async () => {
        (tmdbService.getMovieReviews as unknown as Mock).mockResolvedValue({
            results: mockReviews,
        });

        render(<MovieReview movieId={1} />);

        await waitFor(() => {
            const links = screen.getAllByText('Ler avaliação completa');
            expect(links).toHaveLength(3);
            expect(links[0]).toHaveAttribute('href', 'https://example.com/review/1');
        });
    });
});
