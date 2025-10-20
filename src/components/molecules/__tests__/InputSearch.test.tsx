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

  it('should render input search', () => {
    renderWithProviders();
    expect(screen.getByPlaceholderText('Buscar filme...')).toBeInTheDocument();
  });

  it('should not navigate when input is empty', async () => {
    renderWithProviders();
    const input = screen.getByPlaceholderText('Buscar filme...');

    await user.type(input, '{enter}');

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockSetSearchTerm).not.toHaveBeenCalled();
  });

  it('should submit the search and navitgate to /search when there is text', async () => {
    renderWithProviders();
    const input = screen.getByPlaceholderText('Buscar filme...');

    await user.type(input, 'Matrix');
    await user.type(input, '{enter}');

    expect(mockSetSearchTerm).toHaveBeenCalledWith('Matrix');
    expect(mockNavigate).toHaveBeenCalledWith('/search');
  });
});

