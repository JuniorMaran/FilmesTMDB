import { apiService } from '@/services/api';

interface MoviePopularResponse {
    results: MoviePopularResults[];
    total_results?: number;
    total_pages?: number;
    page?: number;
}

export interface MoviePopularResults {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    overview: string;
    release_date: string;
}

export interface MovieByIdResponse {
    id: number;
    title: string;
    backdrop_path: string;
    poster_path: string;
    genres: { name: string }[];
    release_date: string;
    vote_average: number;
    overview: string;
}

export interface MovieReviewResult {
    id: string;
    author: string;
    content: string;
    created_at: string;
    rating?: number;
    url: string;
    author_details: {
        avatar_path: string;
    };
}

interface MovieReviewResponse {
    results: MovieReviewResult[];
    total_results?: number;
    total_pages?: number;
}

export class TmdbService {
    private token = import.meta.env.VITE_TMDB_KEY;

    async getMoviePopular(page: number = 1): Promise<MoviePopularResponse> {
        return apiService.get<MoviePopularResponse>('/movie/popular', {
            params: {
                api_key: this.token,
                language: 'pt-BR',
                page,
            },
        });
    }

    async getMovieById(id?: string): Promise<MovieByIdResponse> {
        return apiService.get<MovieByIdResponse>(`/movie/${id}`, {
            params: { api_key: this.token, language: 'pt-BR' },
        });
    }
    async searchMovies(query: string, page: number = 1): Promise<MoviePopularResponse> {
        return apiService.get<MoviePopularResponse>('/search/movie', {
            params: {
                api_key: this.token,
                query,
                page,
            },
        });
    }

    async getSimilarMovies(movieId: number): Promise<MoviePopularResponse> {
        return apiService.get<MoviePopularResponse>(`/movie/${String(movieId)}/similar`, {
            params: {
                api_key: this.token,
                language: 'pt-BR',
            },
        });
    }

    async getMovieReviews(movieId: number): Promise<MovieReviewResponse> {
        return apiService.get<MovieReviewResponse>(`/movie/${String(movieId)}/reviews`, {
            params: {
                api_key: this.token,
                language: 'pt-BR',
            },
        });
    }

    getImagePath(image: string, size: string): string {
        const imageUrl = import.meta.env.VITE_TMDB_IMAGE_URL;
        return `${imageUrl}/${size}${image}`;
    }
}

export const tmdbService = new TmdbService();
