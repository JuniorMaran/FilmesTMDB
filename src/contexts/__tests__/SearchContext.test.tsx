import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { SearchProvider, useSearch } from '../SearchContext';

function TestComponent() {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div>
      <div data-testid="search-term">{searchTerm}</div>
      <button onClick={() => setSearchTerm('test')} data-testid="set-search-btn">
        Set Search
      </button>
      <button onClick={() => setSearchTerm('')} data-testid="clear-search-btn">
        Clear Search
      </button>
    </div>
  );
}

describe('SearchContext', () => {
  it('should initialize with empty search term', () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const searchTerm = screen.getByTestId('search-term');
    expect(searchTerm).toHaveTextContent('');
  });

  it('should update search term', async () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const setSearchBtn = screen.getByTestId('set-search-btn');
    const searchTerm = screen.getByTestId('search-term');

    expect(searchTerm).toHaveTextContent('');
    await act(async () => {
      setSearchBtn.click();
    });
    expect(searchTerm).toHaveTextContent('test');
  });

  it('should clear search term', async () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const setSearchBtn = screen.getByTestId('set-search-btn');
    const clearSearchBtn = screen.getByTestId('clear-search-btn');
    const searchTerm = screen.getByTestId('search-term');

    await act(async () => {
      setSearchBtn.click();
    });
    expect(searchTerm).toHaveTextContent('test');
    await act(async () => {
      clearSearchBtn.click();
    });
    expect(searchTerm).toHaveTextContent('');
  });

  it('should throw error when useSearch is used outside provider', () => {
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useSearch deve ser usado dentro de SearchProvider');
  });
});

