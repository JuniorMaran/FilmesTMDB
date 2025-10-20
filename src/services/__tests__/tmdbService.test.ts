import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/services/api', () => ({
  apiService: {
    get: vi.fn(),
  },
}));

import { tmdbService } from '@/services/tmdbService';
import { apiService } from '@/services/api';

describe('tmdbService', () => {
  beforeEach(() => {
    (apiService.get as any).mockReset();
    (apiService.get as any).mockResolvedValue({ results: [] });
    // Garantir URLs base para getImagePath
    (import.meta as any).env = {
      ...(import.meta as any).env,
      VITE_TMDB_IMAGE_URL: 'https://image.tmdb.org/t/p',
      VITE_TMDB_KEY: 'TESTKEY',
    };
  });

  it('getImagePath monta URL corretamente', () => {
    const url = tmdbService.getImagePath('/x.jpg', 'w300');
    expect(url).toBe('https://image.tmdb.org/t/p/w300/x.jpg');
  });

  // getMoviePopular
  it('getMoviePopular (default page=1) chama endpoint com params corretos', async () => {
    await tmdbService.getMoviePopular();
    expect(apiService.get).toHaveBeenCalledWith(
      '/movie/popular',
      expect.objectContaining({
        params: expect.objectContaining({
          api_key: expect.any(String),
          language: 'pt-BR',
          page: 1,
        }),
      })
    );
  });

  it('getMoviePopular (page=3) envia page=3', async () => {
    await tmdbService.getMoviePopular(3);
    expect(apiService.get).toHaveBeenCalledWith(
      '/movie/popular',
      expect.objectContaining({
        params: expect.objectContaining({ page: 3 }),
      })
    );
  });

  it('getMoviePopular (erro) propaga o erro original', async () => {
    (apiService.get as any).mockRejectedValueOnce(new Error('API Error'));
    await expect(tmdbService.getMoviePopular()).rejects.toThrow();
  });

  // getMovieById
  it('getMovieById chama endpoint com params corretos', async () => {
    await tmdbService.getMovieById('42');
    expect(apiService.get).toHaveBeenCalledWith(
      '/movie/42',
      expect.objectContaining({
        params: expect.objectContaining({ api_key: expect.any(String), language: 'pt-BR' }),
      })
    );
  });

  it('getMovieById (erro) propaga o erro original', async () => {
    (apiService.get as any).mockRejectedValueOnce(new Error('API Error'));
    await expect(tmdbService.getMovieById('1')).rejects.toThrow();
  });

  // searchMovies
  it('searchMovies envia query e page (default=1)', async () => {
    await tmdbService.searchMovies('Matrix');
    expect(apiService.get).toHaveBeenCalledWith(
      '/search/movie',
      expect.objectContaining({
        params: expect.objectContaining({ api_key: expect.any(String), query: 'Matrix', page: 1 }),
      })
    );
  });

  it('searchMovies (page=2) envia page=2', async () => {
    await tmdbService.searchMovies('Matrix', 2);
    expect(apiService.get).toHaveBeenCalledWith(
      '/search/movie',
      expect.objectContaining({
        params: expect.objectContaining({ query: 'Matrix', page: 2 }),
      })
    );
  });

  it('searchMovies (erro) propaga o erro original', async () => {
    (apiService.get as any).mockRejectedValueOnce(new Error('API Error'));
    await expect(tmdbService.searchMovies('X')).rejects.toThrow();
  });

  // getSimilarMovies
  it('getSimilarMovies monta URL e params corretamente', async () => {
    await tmdbService.getSimilarMovies(7);
    expect(apiService.get).toHaveBeenCalledWith(
      '/movie/7/similar',
      expect.objectContaining({
        params: expect.objectContaining({ api_key: expect.any(String), language: 'pt-BR' }),
      })
    );
  });

  it('getSimilarMovies (erro) propaga o erro original', async () => {
    (apiService.get as any).mockRejectedValueOnce(new Error('API Error'));
    await expect(tmdbService.getSimilarMovies(1)).rejects.toThrow();
  });

  // getMovieReviews
  it('getMovieReviews monta URL e params corretamente', async () => {
    await tmdbService.getMovieReviews(5);
    expect(apiService.get).toHaveBeenCalledWith(
      '/movie/5/reviews',
      expect.objectContaining({
        params: expect.objectContaining({ api_key: expect.any(String), language: 'pt-BR' }),
      })
    );
  });

  it('getMovieReviews (erro) propaga o erro original', async () => {
    (apiService.get as any).mockRejectedValueOnce(new Error('API Error'));
    await expect(tmdbService.getMovieReviews(1)).rejects.toThrow();
  });
});
