import { describe, it, expect } from '@jest/globals';

import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
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
  it('atualiza o termo de busca', async () => {
    const { getByTestId, getByText } = render(
      <SearchProvider>
        <Consumer />
      </SearchProvider>
    );

    expect(getByTestId('term').textContent).toBe('');
    await act(async () => { getByText('set').click(); });
    expect(getByTestId('term').textContent).toBe('batman');
  });
});

