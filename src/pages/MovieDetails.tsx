import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import { useSuspenseQuery } from '@tanstack/react-query';

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
    const { id } = useParams();
    return (
        <Suspense
            fallback={
                <div className="flex justify-center py-10">
                    <p className="text-[var(--primary-color)]">Carregando detalhes...</p>
                </div>
            }
        >
            <MovieDetailsContent id={id} />
        </Suspense>
    );
};

const MovieDetailsContent: React.FC<{ id?: string }> = ({ id }) => {
    const { data: movieById } = useSuspenseQuery<MovieByIdResponse>({
        queryKey: ['movieById', id],
        queryFn: () => tmdbService.getMovieById(id),
        staleTime: 1000 * 60 * 5,
    });

    const { addMovie, removeMovie, isFavorite } = useFavoriteMovies();
    const favorite = isFavorite(Number(id));

    const handleFavoriteClick = () => {
        if (favorite) {
            removeMovie(Number(id));
        } else {
            addMovie(movieById);
        }
    };

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
                            movieById.genres.map((genre) => (
                                <GenreTag key={genre.name} genre={genre.name} />
                            ))}
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

            {movieById?.id && (
                <Suspense
                    fallback={
                        <div className="flex justify-center py-10">
                            <p className="text-[var(--primary-color)]">Carregando avaliações...</p>
                        </div>
                    }
                >
                    <div><MovieReview movieId={movieById.id} /></div>
                </Suspense>
            )}
            {movieById?.id && (
                <Suspense
                    fallback={
                        <div className="flex justify-center py-10">
                            <p className="text-[var(--primary-color)]">Carregando filmes similares...</p>
                        </div>
                    }
                >
                    <div><SimilarGrid movieId={movieById.id} /></div>
                </Suspense>
            )}
        </>
    );
};
