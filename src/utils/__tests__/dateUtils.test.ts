import { describe, it, expect } from 'vitest';
import { formatDate } from '../dateUtils';

describe('dateUtils', () => {
  it('should format date correctly', () => {
    const result = formatDate('2024-01-15', 'DD [de] MMMM [de] YYYY');
    expect(result).toBe('15 de janeiro de 2024');
  });

  it('should format date with different month', () => {
    const result = formatDate('2024-12-25', 'DD/MM/YYYY');
    expect(result).toBe('25/12/2024');
  });

  it('should format date by default', () => {
    const result = formatDate('2024-01-05');
    expect(result).toBe('05/01/2024');
  });
});

