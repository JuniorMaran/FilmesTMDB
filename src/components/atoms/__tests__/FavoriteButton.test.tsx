import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { FavoriteButton } from '@/components/atoms/FavoriteButton';

const getIcon = (container: HTMLElement) => container.querySelector('svg');

describe('FavoriteButton', () => {
  it('small: nao exibe texto e tem classe rounded-full', () => {
    const { container, queryByText } = render(<FavoriteButton favorite={false} />);
    expect(queryByText(/Adicionar aos favoritos|Remover dos favoritos/)).toBeNull();
    expect(container.firstChild).toHaveClass('rounded-full');

    const icon = getIcon(container)!;
    expect(icon).toHaveClass('text-red-500');
  });

  it('large: nao favoritado - borda primaria, texto e icone com cor primaria', () => {
    const { container, getByText } = render(<FavoriteButton favorite={false} large />);

    expect(container.firstChild).toHaveClass('border');
    expect(container.firstChild).toHaveClass('border-[var(--primary-color)]');

    const text = getByText('Adicionar aos favoritos');
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass('text-[var(--primary-color)]');

    const icon = getIcon(container)!;
    expect(icon).toHaveClass('text-[var(--primary-color)]');
  });

  it('large: favoritado - fundo vermelho, texto branco e icone branco', () => {
    const { container, getByText } = render(<FavoriteButton favorite={true} large />);

    expect(container.firstChild).toHaveClass('bg-red-500');
    expect(container.firstChild).toHaveClass('border-red-500');

    const text = getByText('Remover dos favoritos');
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass('text-white');

    const icon = getIcon(container)!;
    expect(icon).toHaveClass('text-white');
  });
});

