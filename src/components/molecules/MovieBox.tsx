import React from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { FavoriteButton } from '@/components/atoms/FavoriteButton';

import { BoxImage } from '@/components/atoms/BoxImage';
import { RatingTag } from '@/components/atoms/RatingTag';
import { HighlightedTitle } from '@/components/atoms/HighlightedTitle';

import { type MovieByIdResponse, type MoviePopularResults } from '@/services/tmdbService';
import { useFavoriteMovies } from '@/contexts/FavoriteMoviesContext';
import { useSearch } from '@/contexts/SearchContext';

type FavoriteMovie = MovieByIdResponse | MoviePopularResults;

interface MovieBoxProps {
    movie: FavoriteMovie;
    variant?: 'default' | 'favorite' | 'search';
}

export const MovieBox: React.FC<MovieBoxProps> = ({ movie, variant = 'default' }) => {
    const { addMovie, removeMovie, isFavorite } = useFavoriteMovies();
    const { searchTerm } = useSearch();
    const favorite = isFavorite(movie.id);

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (favorite) {
            removeMovie(movie.id);
        } else {
            addMovie(movie);
        }
    };

    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        removeMovie(movie.id);
    };

    const renderButton = () => {
        if (variant === 'favorite') {
            return (
                <button
                    className="absolute top-0 right-0 rounded-full p-2 m-1 cursor-pointer bg-red-500 hover:bg-red-600 transition-colors inline-flex items-center space-x-2"
                    onClick={handleRemoveClick}
                    title="Remover dos favoritos"
                >
                    <MdDeleteOutline className="text-white w-6 h-6" />
                </button>
            );
        }

        return (
            <button className="absolute top-0 right-0" onClick={handleFavoriteClick}>
                <FavoriteButton favorite={favorite} />
            </button>
        );
    };

    const renderTitle = () => {
        if (variant === 'search') {
            return <HighlightedTitle title={movie.title} searchTerm={searchTerm} />;
        }
        return movie.title;
    };

    return (
        <Link to={`/movie/${movie.id}`}>
            <div className="flex flex-col h-full p-3 m-1 sm:m-5 bg-[var(--primary-color)] rounded-md">
                <div className="relative">
                    {renderButton()}
                </div>

                <BoxImage moviePosterPath={movie.poster_path} size='w300'/>

                <p
                    className="line-clamp-2 text-md leading-5 min-h-[2.5rem] mt-[12px] text-[var(--secundary-color)] flex-grow"
                    title={movie.title}
                >
                    {renderTitle()}
                </p>
                <RatingTag rating={movie.vote_average} />
            </div>
        </Link>
    );
};
