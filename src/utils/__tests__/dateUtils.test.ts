

import { describe, it, expect } from '@jest/globals';
import { formatDate } from '@/utils/dateUtils';

describe('formatDate (utils)', () => {
  it('formata data no padrão DD/MM/YYYY por default', () => {
    expect(formatDate('2024-01-02')).toBe('02/01/2024');
  });

  it('formata data com padrão customizado', () => {
    expect(formatDate('2024-06-15', 'YYYY-MM')).toBe('2024-06');
  });
});

