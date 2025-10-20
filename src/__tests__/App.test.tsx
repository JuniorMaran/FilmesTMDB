import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

// Mockar páginas lazy para componentes simples
vi.mock('@/pages/Home', () => ({ Home: () => <div>Home Page</div> }));
vi.mock('@/pages/Favorites', () => ({ Favorites: () => <div>Favorites Page</div> }));
vi.mock('@/pages/MovieDetails', () => ({ MovieDetails: () => <div>Details Page</div> }));
vi.mock('@/pages/NotFound', () => ({ NotFound: () => <div>NotFound Page</div> }));
vi.mock('@/pages/SearchResults', () => ({ SearchResults: () => <div>SearchResults Page</div> }));

import App from '@/App';

describe('App', () => {
  it('renderiza o Layout e a Home por padrão', async () => {
    render(<App />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Home Page')).toBeInTheDocument());
  });
});

