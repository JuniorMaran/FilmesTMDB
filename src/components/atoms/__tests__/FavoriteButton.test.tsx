import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { FavoriteButton } from '@/components/atoms/FavoriteButton';

const getIcon = (container: HTMLElement) => container.querySelector('svg');

describe('FavoriteButton', () => {
    it('favorite and large', () => {
        const { container, getByText } = render(<FavoriteButton favorite={true} large />);
        expect(container.firstChild).toHaveClass('bg-red-500');
        expect(container.firstChild).toHaveClass('border-red-500');

        const text = getByText('Remover dos favoritos');
        expect(text).toBeInTheDocument();
        expect(text).toHaveClass('text-white');

        const icon = getIcon(container);
        expect(icon).toHaveClass('text-white');
    });

    it('no favorite and large', () => {
        const { container, getByText } = render(<FavoriteButton favorite={false} large />);
        expect(container.firstChild).toHaveClass('border-[var(--primary-color)]');

        const text = getByText('Adicionar aos favoritos');
        expect(text).toBeInTheDocument();
        expect(text).toHaveClass('text-[var(--primary-color)]');

        const icon = getIcon(container);
        expect(icon).toHaveClass('text-[var(--primary-color)]');
    });

    it('favorite and small', () => {
        const { container } = render(<FavoriteButton favorite={true} />);
        expect(container.firstChild).toHaveClass('rounded-full');

        const icon = getIcon(container);
        expect(icon).toHaveClass('text-red-500');
    });

    it('no favorite and small', () => {
        const { container } = render(<FavoriteButton favorite={false} />);
        expect(container.firstChild).toHaveClass('rounded-full');

        const icon = getIcon(container);
        expect(icon).toHaveClass('text-red-500');
    });

    it('should not render text when not large', () => {
        const { queryByText } = render(<FavoriteButton favorite={true} />);
        expect(queryByText('Remover dos favoritos')).not.toBeInTheDocument();
    });
    it('should not render text when not large', () => {
        const { queryByText } = render(<FavoriteButton favorite={false} />);
        expect(queryByText('Adicionar aos favoritos')).not.toBeInTheDocument();
    });
});
