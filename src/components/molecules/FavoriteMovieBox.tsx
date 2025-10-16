import React from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';

import { BoxImage } from '@/components/atoms/BoxImage';
import { RatingTag } from '@/components/atoms/RatingTag';

import { type MovieByIdResponse, type MoviePopularResults } from '@/services/tmdbService';
import { useFavoriteMovies } from '@/contexts/FavoriteMoviesContext';

type FavoriteMovie = MovieByIdResponse | MoviePopularResults;

interface FavoriteMovieBoxProps {
    movie: FavoriteMovie;
}

export const FavoriteMovieBox: React.FC<FavoriteMovieBoxProps> = ({ movie }) => {
    const { removeMovie } = useFavoriteMovies();

    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        removeMovie(movie.id);
    };

    return (
        <Link to={`/movie/${movie.id}`}>
            <div className="justify-self-center content-center p-3 m-1 sm:m-5 bg-[var(--primary-color)] rounded-md">
                <div className="relative">
                    <button 
                        className="absolute top-0 right-0 rounded-full p-2 m-1 cursor-pointer bg-red-500 hover:bg-red-600 transition-colors inline-flex items-center space-x-2" 
                        onClick={handleRemoveClick}
                        title="Remover dos favoritos"
                    >
                        <MdDeleteOutline className="text-white w-6 h-6" />
                    </button>
                </div>

                <BoxImage moviePosterPath={movie.poster_path} size='w300'/>

                <p
                    className="line-clamp-2 text-md leading-5 h-[2.5rem] mt-[12px] text-[var(--secundary-color)]"
                    title={movie.title}
                >
                    {movie.title}
                </p>
                <RatingTag rating={movie.vote_average} />
            </div>
        </Link>
    );
};

