import { describe, it, expect, jest } from '@jest/globals';

import { render, screen, waitFor } from '@testing-library/react';
import { MovieReview } from '@/components/organisms/MovieReview';

jest.mock('@/services/tmdbService', () => ({
  tmdbService: {
    getMovieReviews: ((): Promise<any> => Promise.resolve({
      results: [
        { id: '1', author: 'A', content: 'C1', created_at: '2024-01-01', url: 'https://a' },
        { id: '2', author: 'B', content: 'C2', created_at: '2024-01-02', url: 'https://b' },
        { id: '3', author: 'C', content: 'C3', created_at: '2024-01-03', url: 'https://c' },
        { id: '4', author: 'D', content: 'C4', created_at: '2024-01-04', url: 'https://d' },
      ],
    })) as any,
  },
}) as any);

describe('MovieReview', () => {
  it('Renderiza avaliações completas', async () => {
    render(<MovieReview movieId={1} />);

    await waitFor(() => {
      expect(screen.getByText(/Avalia/i)).toBeTruthy();
    });

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(3);
  });
});

