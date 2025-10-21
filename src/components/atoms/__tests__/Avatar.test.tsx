import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from '@/components/atoms/Avatar';

vi.mock('@/services/tmdbService', () => ({
    tmdbService: {
        getImagePath: vi.fn(
            (path: string, size: string) => `https://image.tmdb.org/t/p/${size}${path}`
        ),
    },
}));

describe('Avatar', () => {
    it('should render placeholder when avatar is empty', () => {
        render(<Avatar avatar="" />);

        expect(screen.getByAltText('Avatar')).toBeInTheDocument();
    });
    it('should render placeholder when avatar is undefined', () => {
        render(<Avatar avatar={undefined as unknown as string} />);

        expect(screen.getByAltText('Avatar')).toBeInTheDocument();
    });
    it('should render image when avatar is provided', () => {
        render(<Avatar avatar="/test.jpg" />);

        const img = screen.getByAltText('Avatar') as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toContain('test.jpg');
    });
});

