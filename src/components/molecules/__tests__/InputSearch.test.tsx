import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { InputSearch } from '../InputSearch';
import { SearchProvider } from '@/contexts/SearchContext';

const user = userEvent.setup();

let mockNavigate = vi.fn();
const mockSetSearchTerm = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/contexts/SearchContext', async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    useSearch: () => ({ searchTerm: '', setSearchTerm: mockSetSearchTerm }),
    SearchProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('InputSearch', () => {
  beforeEach(() => {
    mockNavigate = vi.fn();
    mockSetSearchTerm.mockClear();
    vi.clearAllMocks();
  });

  const renderWithProviders = () =>
    render(
      <BrowserRouter>
        <SearchProvider>
          <InputSearch />
        </SearchProvider>
      </BrowserRouter>
    );

  it('deve renderizar o input de busca', () => {
    renderWithProviders();
    expect(screen.getByPlaceholderText('Buscar filme...')).toBeInTheDocument();
  });

  it('não deve navegar quando o input está vazio', async () => {
    renderWithProviders();
    const input = screen.getByPlaceholderText('Buscar filme...');

    await user.type(input, '{enter}');

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockSetSearchTerm).not.toHaveBeenCalled();
  });

  it('deve enviar a busca e navegar para /search quando houver texto', async () => {
    renderWithProviders();
    const input = screen.getByPlaceholderText('Buscar filme...');

    await user.type(input, 'Matrix');
    await user.type(input, '{enter}');

    expect(mockSetSearchTerm).toHaveBeenCalledWith('Matrix');
    expect(mockNavigate).toHaveBeenCalledWith('/search');
  });
});

