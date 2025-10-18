import { apiService } from '@/services/api';

interface MoviePopularResponse {
    results: MoviePopularResults[];
    total_results?: number;
    total_pages?: number;
    page?: number;
};

export interface MoviePopularResults {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
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

export class TmdbService {
    private token = import.meta.env.VITE_TMDB_KEY;

    async getMoviePopular(page: number = 1): Promise<MoviePopularResponse> {
        try {
            return apiService.get<MoviePopularResponse>('/movie/popular', {
                params: {
                    api_key: this.token,
                    page,
                }
            });

        } catch (error) {
            new Error('Error fetching popular movies');
            throw error;
        }
    }

    async getMovieById(id?: string): Promise<MovieByIdResponse> {
        try {
            return apiService.get<MovieByIdResponse>(`/movie/${id}`, {params: {api_key: this.token}});
        } catch (error) {
            new Error('Error fetching movie');
            throw error;
        }
    }
    async searchMovies(query: string, page: number = 1): Promise<MoviePopularResponse> {
        try {
            return apiService.get<MoviePopularResponse>('/search/movie', {
                params: {
                    api_key: this.token,
                    query,
                    page,
                }
            });
        } catch (error) {
            new Error('Error searching movies');
            throw error;
        }
    }

    getImagePath(image: string, size: string): string { 
        try {
            const imageUrl = import.meta.env.VITE_TMDB_IMAGE_URL;

            return `${imageUrl}/${size}${image}`;

        } catch (error) {
            new Error('Error fetching image URL');
            throw error;
        }
    }
}


export const tmdbService = new TmdbService();