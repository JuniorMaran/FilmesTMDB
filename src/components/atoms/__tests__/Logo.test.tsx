import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Logo } from '../Logo';

describe('Logo', () => {
  it('renderiza a imagem e link para /', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
    const img = screen.getByAltText('TMDB Logo');
    expect(img).toBeInTheDocument();
  });
});

