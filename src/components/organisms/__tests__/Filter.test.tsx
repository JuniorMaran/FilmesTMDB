import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Filter } from '../Filter';

describe('Filter', () => {
  const mockOnSortChange = vi.fn();

  it('should render filter component', () => {
    render(
      <Filter
        sortBy="title-asc"
        onSortChange={mockOnSortChange}
        totalItems={10}
      />
    );

    expect(screen.getByText(/Ordenar por/)).toBeInTheDocument();
  });

  it('should display total items count', () => {
    render(
      <Filter
        sortBy="title-asc"
        onSortChange={mockOnSortChange}
        totalItems={5}
      />
    );

    expect(screen.getByText(/5/)).toBeInTheDocument();
  });

  it('should display custom item label', () => {
    render(
      <Filter
        sortBy="title-asc"
        onSortChange={mockOnSortChange}
        totalItems={3}
        itemLabel="filme"
      />
    );

    expect(screen.getByText(/3 filme/)).toBeInTheDocument();
  });

  it('should call onSortChange when sort option is selected', () => {
    render(
      <Filter
        sortBy="title-asc"
        onSortChange={mockOnSortChange}
        totalItems={10}
      />
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    select.value = 'title-desc';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(mockOnSortChange).toHaveBeenCalled();
  });

  it('should have all sort options available', () => {
    render(
      <Filter
        sortBy="title-asc"
        onSortChange={mockOnSortChange}
        totalItems={10}
      />
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const options = Array.from(select.options).map(opt => opt.value);

    expect(options).toContain('title-asc');
    expect(options).toContain('title-desc');
    expect(options).toContain('rating-desc');
    expect(options).toContain('rating-asc');
  });

  it('should display correct current sort option', () => {
    render(
      <Filter
        sortBy="rating-desc"
        onSortChange={mockOnSortChange}
        totalItems={10}
      />
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('rating-desc');
  });

  it('should handle zero items', () => {
    render(
      <Filter
        sortBy="title-asc"
        onSortChange={mockOnSortChange}
        totalItems={0}
      />
    );

    expect(screen.getByText(/0/)).toBeInTheDocument();
  });
});

