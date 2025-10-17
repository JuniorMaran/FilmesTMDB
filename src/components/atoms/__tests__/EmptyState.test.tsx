import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  it('should render title and description', () => {
    render(
      <BrowserRouter>
        <EmptyState
          title="Test Title"
          description="Test Description"
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should render icon when provided', () => {
    render(
      <BrowserRouter>
        <EmptyState
          title="Test Title"
          description="Test Description"
          icon="🎬"
        />
      </BrowserRouter>
    );

    expect(screen.getByText('🎬')).toBeInTheDocument();
  });

  it('should not render icon when not provided', () => {
    const { container } = render(
      <BrowserRouter>
        <EmptyState
          title="Test Title"
          description="Test Description"
        />
      </BrowserRouter>
    );

    const iconDiv = container.querySelector('.text-6xl');
    expect(iconDiv).not.toBeInTheDocument();
  });

  it('should render button when buttonText and buttonLink are provided', () => {
    const { container } = render(
      <BrowserRouter>
        <EmptyState
          title="Test Title"
          description="Test Description"
          buttonText="Click Me"
          buttonLink="/"
        />
      </BrowserRouter>
    );

    const link = container.querySelector('a[href="/"]');
    expect(link).toBeInTheDocument();
  });

  it('should not render button when buttonText is not provided', () => {
    const { container } = render(
      <BrowserRouter>
        <EmptyState
          title="Test Title"
          description="Test Description"
          buttonLink="/"
        />
      </BrowserRouter>
    );

    const link = container.querySelector('a[href="/"]');
    expect(link).not.toBeInTheDocument();
  });

  it('should have correct link href', () => {
    const { container } = render(
      <BrowserRouter>
        <EmptyState
          title="Test Title"
          description="Test Description"
          buttonText="Go Home"
          buttonLink="/"
        />
      </BrowserRouter>
    );

    const link = container.querySelector('a[href="/"]');
    expect(link).toBeInTheDocument();
  });
});

