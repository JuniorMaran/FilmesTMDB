import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BoxImage } from '@/components/atoms/BoxImage';
import { GenreTag } from '@/components/atoms/GenreTag';
import { RatingTag } from '@/components/atoms/RatingTag';
import { getCompleteDate } from '@/utils/dateUtils';
import { tmdbService, type MovieByIdResponse } from '@/services/tmdbService';
import { FavoriteButton } from '@/components/atoms/FavoriteButton';

export const MovieDetails: React.FC = () => {
    const [movieById, setMovieById] = useState<MovieByIdResponse>({} as MovieByIdResponse);
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    const loadMoviePopularData = async () => {
        try {
            setIsLoading(true);
            const response = await tmdbService.getMovieById(id);

            setMovieById(response);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadMoviePopularData();
    // eslint-disable-next-line
    }, []);

    return (
        <div className="flex mx-10 flex-col sm:flex-row align-items-center justify-center mt-10 mb-10">
            <div className="w-full sm:w-1/2 mr-5  max-w-lg">
                <BoxImage moviePosterPath={movieById?.backdrop_path} size="original" />
            </div>
            <div className="w-full sm:w-1/2 ml-5 max-w-lg">
                <p className="text-2xl font-bold mb-2">{movieById?.title}</p>
                <div className="mb-2 flex flex-wrap">
                    {movieById?.genres &&
                        movieById.genres.map((genre) => <GenreTag genre={genre.name} />)}
                </div>

                <div className="font-bold">
                    Data de lançamento:
                    <span className="font-light"> {getCompleteDate(movieById?.release_date)}</span>
                </div>
                <div className="mb-2 font-bold">
                    Nota TMDB: <RatingTag rating={movieById?.vote_average} />
                </div>

                <div className="font-bold text-xl">
                    Sinopse <p className="font-light text-base"> {movieById?.overview}</p>
                </div>

                <FavoriteButton favorite={false} large />
            </div>
        </div>
    );
};
