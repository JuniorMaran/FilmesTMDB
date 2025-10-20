import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/components/organisms/Header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

import Layout from '../Layout';

describe('Layout', () => {
  it('renderiza Header e children', () => {
    render(
      <Layout>
        <div data-testid="slot">Slot</div>
      </Layout>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('slot')).toBeInTheDocument();
  });
});

