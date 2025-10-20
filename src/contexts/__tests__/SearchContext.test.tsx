import { describe, it, expect } from '@jest/globals';

import { render, screen, fireEvent } from '@testing-library/react';
import { SearchProvider, useSearch } from '@/contexts/SearchContext';

const Consumer: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  return (
    <div>
      <div data-testid="term">{searchTerm}</div>
      <button onClick={() => setSearchTerm('batman')}>set</button>
    </div>
  );
};

describe('SearchContext', () => {
  it('atualiza o termo de busca', () => {
    render(
      <SearchProvider>
        <Consumer />
      </SearchProvider>
    );

    expect(screen.getByTestId('term').textContent).toBe('');
    fireEvent.click(screen.getByText('set'));
    expect(screen.getByTestId('term').textContent).toBe('batman');
  });
});

