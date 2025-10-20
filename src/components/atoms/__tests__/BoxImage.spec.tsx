import { describe, it, expect, jest } from '@jest/globals';

import { render, screen } from '@testing-library/react';
import { BoxImage } from '@/components/atoms/BoxImage';

jest.mock('@/services/tmdbService', () => ({
  tmdbService: {
    getImagePath: (path: string, size: string) => `https://image.tmdb.org/t/p/${size}${path}`,
  },
}));

describe('BoxImage', () => {
  it('renders placeholder when no poster', () => {
    render(<BoxImage moviePosterPath={'' as any} size="w300" />);
    expect(screen.getByText(/Imagem/i)).toBeTruthy();
  });

  it('renders <img> with computed src when poster exists', () => {
    render(<BoxImage moviePosterPath="/abc.jpg" size="w300" />);
    const img = screen.getByAltText('Poster do filme') as HTMLImageElement;
    expect(img.src).toBe('https://image.tmdb.org/t/p/w300/abc.jpg');
  });
});

