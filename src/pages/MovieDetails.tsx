import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BoxImage } from '@/components/atoms/BoxImage';
import { GenreTag } from '@/components/atoms/GenreTag';
import { RatingTag } from '@/components/atoms/RatingTag';
import { formatDate } from '@/utils/dateUtils';
import { tmdbService, type MovieByIdResponse } from '@/services/tmdbService';
import { FavoriteButton } from '@/components/atoms/FavoriteButton';
import { useFavoriteMovies } from '@/contexts/FavoriteMoviesContext';
import { SimilarGrid } from '@/components/organisms/SimilarGrid';
import { MovieReview } from '@/components/organisms/MovieReview';

export const MovieDetails: React.FC = () => {
    const [movieById, setMovieById] = useState<MovieByIdResponse>({} as MovieByIdResponse);
    const { addMovie, removeMovie, isFavorite } = useFavoriteMovies();

    const { id } = useParams();
    const favorite = isFavorite(Number(id));

    const handleFavoriteClick = () => {
        if (favorite) {
            removeMovie(Number(id));
        } else {
            addMovie(movieById);
        }
    };

    useEffect(() => {
        const loadMoviePopularData = async () => {
            try {
                const response = await tmdbService.getMovieById(id);
                setMovieById(response);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        loadMoviePopularData();
    }, [id]);

    return (
        <>
            <div className="flex mx-10 flex-col sm:flex-row align-items-center justify-center sm:gap-10 mt-10 mb-10 ">
                <div className="w-full sm:w-1/2 self-center max-w-lg">
                    <BoxImage moviePosterPath={movieById?.backdrop_path} size="original" />
                </div>
                <div className="w-full sm:w-1/2 max-w-lg">
                    <p className="text-2xl font-bold mb-2">{movieById?.title}</p>
                    <div className="mb-2 flex flex-wrap">
                        {movieById?.genres &&
                            movieById.genres.map((genre) => <GenreTag genre={genre.name} />)}
                    </div>
                    <div className="font-bold">
                        Data de lançamento:
                        <span className="font-light"> { movieById?.release_date ? formatDate(movieById?.release_date, 'DD [de] MMMM [de] YYYY') : 'Não informada'} </span>
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

            {movieById?.id && <div><MovieReview movieId={movieById.id} /></div>}
            {movieById?.id && <div><SimilarGrid movieId={movieById.id} /></div>}
        </>
    );
};
