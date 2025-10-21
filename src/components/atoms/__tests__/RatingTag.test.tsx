import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RatingTag } from '@/components/atoms/RatingTag';

describe('RatingTag', () => {
    it('should render rating tag with color: gray and correct text', () => {
        render(<RatingTag rating={0.0} />);
        expect(screen.getByText('0.0')).toBeInTheDocument();
        expect(screen.getByText('0.0')).toHaveClass('bg-gray-400');
    })
    it('should render rating tag with color: red and correct text', () => {
        render(<RatingTag rating={4.0} />);
        expect(screen.getByText('4.0')).toBeInTheDocument();
        expect(screen.getByText('4.0')).toHaveClass('bg-red-400');
    });

    it('should render rating tag with color: yellow and correct text', () => {
        render(<RatingTag rating={7.5} />);
        expect(screen.getByText('7.5')).toBeInTheDocument();
        expect(screen.getByText('7.5')).toHaveClass('bg-yellow-400');
    });

    it('should render rating tag with color: green and correct text', () => {
        render(<RatingTag rating={9.0} />);
        expect(screen.getByText('9.0')).toBeInTheDocument();
        expect(screen.getByText('9.0')).toHaveClass('bg-green-400');
    });
});
