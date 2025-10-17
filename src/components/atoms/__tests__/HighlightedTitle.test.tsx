import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HighlightedTitle } from '../HighlightedTitle';

describe('HighlightedTitle', () => {
  it('should render title without highlight when searchTerm is empty', () => {
    const { container } = render(
      <HighlightedTitle title="The Matrix" searchTerm="" />
    );

    expect(screen.getByText('The Matrix')).toBeInTheDocument();
    expect(container.querySelector('.bg-yellow-300')).not.toBeInTheDocument();
  });

  it('should highlight matching search term', () => {
    const { container } = render(
      <HighlightedTitle title="The Matrix" searchTerm="Matrix" />
    );

    const highlighted = container.querySelector('.bg-yellow-300');
    expect(highlighted).toBeInTheDocument();
    expect(highlighted).toHaveTextContent('Matrix');
  });

  it('should highlight case-insensitive', () => {
    const { container } = render(
      <HighlightedTitle title="The Matrix" searchTerm="matrix" />
    );

    const highlighted = container.querySelector('.bg-yellow-300');
    expect(highlighted).toBeInTheDocument();
    expect(highlighted).toHaveTextContent('Matrix');
  });

  it('should highlight multiple occurrences', () => {
    const { container } = render(
      <HighlightedTitle title="The Matrix Matrix" searchTerm="Matrix" />
    );

    const highlighted = container.querySelectorAll('.bg-yellow-300');
    expect(highlighted).toHaveLength(2);
  });

  it('should render full title with partial match', () => {
    const { container } = render(
      <HighlightedTitle title="The Matrix Reloaded" searchTerm="Matrix" />
    );

    expect(container.textContent).toContain('The Matrix Reloaded');
  });

  it('should handle special characters in search term', () => {
    const { container } = render(
      <HighlightedTitle title="Test 2024" searchTerm="2024" />
    );

    const highlighted = container.querySelector('.bg-yellow-300');
    expect(highlighted).toBeInTheDocument();
  });

  it('should trim whitespace from search term', () => {
    const { container } = render(
      <HighlightedTitle title="The Matrix" searchTerm="  " />
    );

    expect(container.querySelector('.bg-yellow-300')).not.toBeInTheDocument();
  });
});

