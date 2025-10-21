import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PageButton } from '@/components/atoms/PageButton';

describe('PageButton', () => {
    it('should render link with correct text and href', () => {
        render(
            <BrowserRouter>
                <PageButton page="home" />
            </BrowserRouter>
        );

        const link = screen.getByRole('link', { name: 'Home' });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/');
    });

    it('should render link with default href for unknown page', () => {
        render(
            <BrowserRouter>
                <PageButton page="" />
            </BrowserRouter>
        );

        const link = screen.getByRole('link', { name: '' });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/not-found');
    });
});
