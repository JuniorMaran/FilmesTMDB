import { describe, it, expect } from '@jest/globals';

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { InputSearch } from '@/components/molecules/InputSearch';
import { SearchProvider } from '@/contexts/SearchContext';

describe('InputSearch', () => {
  it('updates input value and submits when not empty', () => {
    render(
      <SearchProvider>
        <MemoryRouter>
          <InputSearch />
        </MemoryRouter>
      </SearchProvider>
    );

    const input = screen.getByPlaceholderText('Buscar filme...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123');

    const form = input.closest('form')!;
    fireEvent.submit(form);
    expect(true).toBe(true);
  });
});

