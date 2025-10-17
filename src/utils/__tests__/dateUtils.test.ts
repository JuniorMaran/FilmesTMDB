import { describe, it, expect } from 'vitest';
import { getCompleteDate } from '../dateUtils';

describe('dateUtils', () => {
  it('should format date correctly', () => {
    const result = getCompleteDate('2024-01-15');
    expect(result).toBe('15 de janeiro de 2024');
  });

  it('should format date with different month', () => {
    const result = getCompleteDate('2024-12-25');
    expect(result).toBe('25 de dezembro de 2024');
  });

  it('should format date with single digit day', () => {
    const result = getCompleteDate('2024-01-05');
    expect(result).toBe('05 de janeiro de 2024');
  });

  it('should format date in Portuguese locale', () => {
    const result = getCompleteDate('2024-06-10');
    expect(result).toContain('de');
    expect(result).toContain('junho');
  });

  it('should handle leap year date', () => {
    const result = getCompleteDate('2024-02-29');
    expect(result).toBe('29 de fevereiro de 2024');
  });

  it('should format date at end of year', () => {
    const result = getCompleteDate('2024-12-31');
    expect(result).toBe('31 de dezembro de 2024');
  });

  it('should format date at start of year', () => {
    const result = getCompleteDate('2024-01-01');
    expect(result).toBe('01 de janeiro de 2024');
  });
});

