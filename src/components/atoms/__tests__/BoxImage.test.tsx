import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BoxImage } from '../BoxImage';

vi.mock('@/services/tmdbService', () => ({
  tmdbService: {
    getImagePath: (path: string) => `https://image.tmdb.org/t/p/w300${path}`,
  },
}));

describe('BoxImage', () => {
  it('should render placeholder when moviePosterPath is empty', () => {
    render(<BoxImage moviePosterPath="" size="w300" />);

    expect(screen.getByText('Imagem não disponível')).toBeInTheDocument();
  });

  it('should render placeholder when moviePosterPath is undefined', () => {
    render(<BoxImage moviePosterPath="" size="w300" />);

    expect(screen.getByText('Imagem não disponível')).toBeInTheDocument();
  });

  it('should render image when moviePosterPath is provided', () => {
    render(<BoxImage moviePosterPath="/test.jpg" size="w300" />);

    const img = screen.getByAltText('Poster do filme') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('test.jpg');
  });

  it('should have correct image size class', () => {
    const { container } = render(<BoxImage moviePosterPath="/test.jpg" size="w300" />);

    const imgContainer = container.querySelector('.w-full.overflow-hidden.rounded-md');
    expect(imgContainer).toBeInTheDocument();
  });

  it('should have height class for consistent sizing', () => {
    const { container } = render(<BoxImage moviePosterPath="/test.jpg" size="w300" />);

    const imgContainer = container.querySelector('.h-\\[150px\\]');
    expect(imgContainer).toBeInTheDocument();
  });

  it('should have object-cover class for proper image scaling', () => {
    const { container } = render(<BoxImage moviePosterPath="/test.jpg" size="w300" />);

    const img = container.querySelector('img.object-cover');
    expect(img).toBeInTheDocument();
  });

  it('should render placeholder with icon', () => {
    const { container } = render(<BoxImage moviePosterPath="" size="w300" />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should have rounded corners', () => {
    const { container } = render(<BoxImage moviePosterPath="/test.jpg" size="w300" />);

    const imgContainer = container.querySelector('.rounded-md');
    expect(imgContainer).toBeInTheDocument();
  });

  it('should have onLoad and onError handlers on image', () => {
    render(<BoxImage moviePosterPath="/test.jpg" size="w300" />);

    const img = screen.getByAltText('Poster do filme') as HTMLImageElement;
    expect(img.onload).toBeDefined();
    expect(img.onerror).toBeDefined();
  });
});

