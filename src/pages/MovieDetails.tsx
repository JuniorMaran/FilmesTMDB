import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BoxImage } from '@/components/atoms/BoxImage';
import { GenreTag } from '@/components/atoms/GenreTag';
import { RatingTag } from '@/components/atoms/RatingTag';
import { getCompleteDate } from '@/utils/dateUtils';
import { tmdbService, type MovieByIdResponse } from '@/services/tmdbService';
import { FavoriteButton } from '@/components/atoms/FavoriteButton';
import { useFavoriteMovies } from '@/contexts/FavoriteMoviesContext';

export const MovieDetails: React.FC = () => {
    const [movieById, setMovieById] = useState<MovieByIdResponse>({} as MovieByIdResponse);
    const { addMovie, removeMovie, isFavorite } = useFavoriteMovies();

    const { id } = useParams();
    const favorite = isFavorite(Number(id));

    const loadMoviePopularData = async () => {
        try {
            const response = await tmdbService.getMovieById(id);
            setMovieById(response);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleFavoriteClick = () => {
        if (favorite) {
            removeMovie(Number(id));
        } else {
            addMovie(movieById);
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
                    <span className="font-light"> { movieById?.release_date ? getCompleteDate(movieById?.release_date) : 'Não informada'} </span>
                </div>
                <div className="mb-2 font-bold">
                    Nota TMDB: <RatingTag rating={movieById?.vote_average} />
                </div>

                <div className="font-bold text-xl">
                    Sinopse <p className="font-light text-base"> {movieById?.overview || 'Não informada'}</p>
                </div>

                <button onClick={handleFavoriteClick} className="mt-4">
                    <FavoriteButton favorite={favorite} large />
                </button>
            </div>
        </div>
    );
};
