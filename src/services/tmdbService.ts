import { apiService } from '@/services/api';

interface MoviePopularResponse {
    results: MoviePopularResults[];
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
    genres: { name: string }[];
    release_date: string;
    vote_average: number;
    overview: string;

}

export class TmdbService {
    private token = import.meta.env.VITE_TMDB_KEY;

    async getMoviePopular(): Promise<MoviePopularResponse> {
        try {
            return apiService.get<MoviePopularResponse>('/movie/popular', {params: {api_key: this.token}});
            
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