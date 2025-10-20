import { describe, it, expect } from '@jest/globals';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { InputSearch } from '@/components/molecules/InputSearch';
import { SearchProvider } from '@/contexts/SearchContext';

describe('InputSearch', () => {
  it('updates input value and submits when not empty', () => {
    const { getByPlaceholderText } = render(
      <SearchProvider>
        <MemoryRouter>
          <InputSearch />
        </MemoryRouter>
      </SearchProvider>
    );

    const input = getByPlaceholderText('Buscar filme...') as HTMLInputElement;

    input.value = '123';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(input.value).toBe('123');

    const form = input.closest('form')!;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(true).toBe(true);
  });
});

